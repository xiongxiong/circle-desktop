import { IHasId, ITodoInsert, ITodoSearch, ITodoUpdate, ITodoDuplicate, ITodoClosure, TodoStatus } from "@/interface/Todo";
import { env } from "@/utils/env";
import { uLog } from "@/utils/log";
import BetterSqlite3, {Database, Statement} from "better-sqlite3";
import {initData, pragmas, initTable} from './init';

enum StmtNames {
	TableCount = 'TableCount',
	TodoDuplicateTreeSelect = 'TodoDuplicateTreeSelect',
	TodoSelectList = "TodoSelectList",
	TodoSelect = 'TodoSelect',
	TodoSelectStatAll = 'TodoSelectStatAll',
	TodoInsert = 'TodoInsert',
	TodoDuplicate = 'TodoDuplicate',
	TodoUpdate = 'TodoUpdate',
	TodoDelete = 'TodoDelete',
}


class DbService {

	private db: Database;
	private stmtMap = new Map<StmtNames, Statement>();

	open = () => {
		this.db = new BetterSqlite3(env.dbFile(), env.dbOptions());
	}

	close = () => {
		this.db.close();
	}

	backup = () => this.db.backup(env.dbFileBackup());

	restore = async () => {}

	init = () => {
		const {count = 0} = this.stmt(StmtNames.TableCount, 'SELECT COUNT(*) AS count FROM (SELECT type,name,sql,tbl_name FROM "main".sqlite_master)')?.get() || {};
		console.log("DATABASE TABLE COUNT -- ", count);
		
		if (count === 0) {
			console.log("DATABASE EMPTY > INIT");
			uLog(() => this.db.transaction(() => this.db.exec(initTable)).immediate(), "INIT TABLE");
			uLog(() => this.db.transaction(() => this.db.exec(initData)).immediate(), "INIT DATA");
		}
		uLog(() => pragmas.map(({cmd, res}) => {
			this.db.pragma(cmd);
			res && console.log(this.db.pragma(res, {simple: true}));
		}), "PRAGMA");
	}

	prepare = () => {
		this.stmt(StmtNames.TodoSelectList, "select * from todo where coalesce(content like '%' || @content || '%', 1) and coalesce(parentId = @parentId, 1) and coalesce(isFinish = @isFinish, 1) and (case @isFinish is null when 1 then (isDelete = 1 or isAncestorDelete = 1) else (isDelete = 0 and isAncestorDelete = 0) end) and id > 0 order by priority desc, childrenPriority desc, updatedAt desc");
		this.stmt(StmtNames.TodoSelect, 'select * from todo where id = @id');
		this.stmt(StmtNames.TodoSelectStatAll, 'select (select count(1) from todo where id > 0) as childrenCount, (select count(1) from todo where isFinish = 1 and isDelete = 0 and isAncestorDelete = 0 and id > 0) as childrenFinish, (select count(1) from todo where (isDelete = 1 or isAncestorDelete = 1) and id > 0) as childrenDelete');
		this.stmt(StmtNames.TodoInsert, 'insert into todo (content, parentId) values (@content, @parentId)');
		this.stmt(StmtNames.TodoDuplicateTreeSelect, 'select idAncestor, idDescendant, length from todo_closure where idAncestor in (select idDescendant from todo_closure where idAncestor = @id) and length = 1 order by idDescendant');
		this.stmt(StmtNames.TodoDuplicate, 'insert into todo (content, parentId) select content, @parentId from todo where id = @id');
		this.stmt(StmtNames.TodoUpdate, 'update todo set content = (case @content is null when 1 then content else @content end), comment = (case @comment is null when 1 then comment else @comment end), isFinish = (case @isFinish is null when 1 then isFinish else @isFinish end), isDelete = (case @isDelete is null when 1 then isDelete else @isDelete end), parentId = (case @parentId is null when 1 then parentId else @parentId end), priority = (case @priority is null when 1 then priority else @priority end) where id = @id');
		this.stmt(StmtNames.TodoDelete, 'delete from todo where id = @id');
	}

	migrate = () => {

	}

	private stmt = (name: StmtNames, sql?: string) => {
		if (!this.stmtMap.get(name) && sql) {
			this.stmtMap.set(name, this.db.prepare(sql));
		}
		return this.stmtMap.get(name);
	}

	todoSelectList = (todo: ITodoSearch) => {
		const {content, parentId, status} = todo || {};
		switch (status) {
			case TodoStatus.DOING:
				return this.stmt(StmtNames.TodoSelectList)?.all({content, parentId, isFinish: 0}) || [];
			case TodoStatus.DONE:
				return this.stmt(StmtNames.TodoSelectList)?.all({content, parentId, isFinish: 1}) || [];
			case TodoStatus.DELETED:
				return this.stmt(StmtNames.TodoSelectList)?.all({content, parentId, isFinish: undefined}) || [];
			default:
				return [];
		}
	}

	todoSelect = (todo: IHasId) => {
		const {id} = todo || {id: 0};
		return this.stmt(StmtNames.TodoSelect)?.get({id});
	}

	todoSelectStatAll = () => {
		return this.stmt(StmtNames.TodoSelectStatAll)?.get();
	}

	todoInsert = (todo: ITodoInsert) => {
		const {content, parentId} = todo || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoInsert)?.run({content, parentId}).changes || 0) > 0).immediate();
	}

	todoDuplicate = (todo: ITodoDuplicate) => {
		const {id, parentId} = todo || {};
		if (id === parentId) return false;
		return this.db.transaction(() => {
			const idMap = new Map<number, number>(); // key: oldId, value: newId

			const stmt = this.stmt(StmtNames.TodoDuplicate);
			const stmtRes = stmt?.run({id, parentId});
			const {changes = 0, lastInsertRowid} = stmtRes || {};
			lastInsertRowid && idMap.set(id, parseInt(lastInsertRowid.toString()));

			const nodes: ITodoClosure[] = this.stmt(StmtNames.TodoDuplicateTreeSelect)?.all({id}) || [];
			for (const node of nodes) {
				const {idAncestor, idDescendant: curId} = node;
				const curParentId = idMap.get(idAncestor);
				const curRes = stmt?.run({id: curId, parentId: curParentId});
				const {lastInsertRowid: newId} = curRes || {};
				newId && idMap.set(curId, parseInt(newId.toString()));
			}

			return changes > 0;
		}).immediate();
	}

	todoUpdate = (todo: ITodoUpdate) => {
		const {id, content, comment, isFinish, isDelete, priority, parentId} = todo || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoUpdate)?.run({id, content, comment, isFinish: (isFinish === undefined ? undefined : isFinish ? 1 : 0), isDelete: (isDelete === undefined ? undefined : isDelete ? 1 : 0), priority, parentId}).changes || 0) > 0).immediate();
	}

	todoDelete = (todo: IHasId) => {
		const {id} = todo || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoDelete)?.run({id}).changes || 0) > 0).immediate();
	}
}

export const dbService = new DbService();
