import { IHasId, ITodoInsert, ITodoSearch, ITodoUpdate, ITodoDuplicate, ITodoClosure, TodoStatus, ITodoDelete, IListSearch, IListInsert, IListUpdate, IListDelete, IHasListId } from "@/interface/Data";
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
	ListTreeSelect = "ListTreeSelect",
	ListNodeSelect = "ListNodeSelect",
	ListInsert = 'ListInsert',
	ListUpdate = 'ListUpdate',
	ListDelete = 'ListDelete',
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
		this.stmt(StmtNames.TodoSelectList, "select * from todo where coalesce(listId = @listId, 1) and coalesce(content like '%' || @content || '%', 1) and coalesce(parentId = @parentId, 1) and coalesce(isFinish = @isFinish, 1) and (case @isFinish is null when 1 then (isDelete = 1 or isAncestorDelete = 1) else (isDelete = 0 and isAncestorDelete = 0) end) and parentId != -1 order by priority desc, childrenPriority desc, updatedAt desc");
		this.stmt(StmtNames.TodoSelect, 'select * from todo where id = @id');
		this.stmt(StmtNames.TodoSelectStatAll, 'select (select count(1) from todo where listId = @listId and parentId != -1) as childrenCount, (select count(1) from todo where isFinish = 1 and isDelete = 0 and isAncestorDelete = 0 and listId = @listId and parentId != -1) as childrenFinish, (select count(1) from todo where (isDelete = 1 or isAncestorDelete = 1) and listId = @listId and parentId != -1) as childrenDelete');
		this.stmt(StmtNames.TodoInsert, 'insert into todo (content, parentId, listId) values (@content, @parentId, (select listId from todo where id = @parentId))');
		this.stmt(StmtNames.TodoDuplicateTreeSelect, 'select idAncestor, idDescendant, length from todo_closure where idAncestor in (select idDescendant from todo_closure where idAncestor = @id) and length = 1 order by idDescendant');
		this.stmt(StmtNames.TodoDuplicate, 'insert into todo (content, parentId, listId) select content, @parentId, (select listId from todo where id = @parentId) from todo where id = @id');
		this.stmt(StmtNames.TodoUpdate, 'update todo set content = (case @content is null when 1 then content else @content end), comment = (case @comment is null when 1 then comment else @comment end), isFinish = (case @isFinish is null when 1 then isFinish else @isFinish end), isDelete = (case @isDelete is null when 1 then isDelete else @isDelete end), parentId = (case @parentId is null when 1 then parentId else @parentId end), priority = (case @priority is null when 1 then priority else @priority end) where id = @id');
		this.stmt(StmtNames.TodoDelete, 'delete from todo where id = @id');
		this.stmt(StmtNames.ListTreeSelect, 'select * from list where parentId != -1');
		this.stmt(StmtNames.ListNodeSelect, 'select * from list where parentId = @parentId');
		this.stmt(StmtNames.ListInsert, 'insert into list (title, parentId, isGroup) values (@title, @parentId, @isGroup)');
		this.stmt(StmtNames.ListUpdate, 'update list set title = (case @title is null when 1 then title else @title end), parentId = (case @parentId is null when 1 then parentId else @parentId end), isDelete = (case @isDelete is null when 1 then isDelete else @isDelete end) where id = @id');
		this.stmt(StmtNames.ListDelete, 'delete from list where id = @id');
	}

	migrate = () => {

	}

	private stmt = (name: StmtNames, sql?: string) => {
		if (!this.stmtMap.get(name) && sql) {
			this.stmtMap.set(name, this.db.prepare(sql));
		}
		return this.stmtMap.get(name);
	}

	todoSelectList = (data: ITodoSearch) => {
		const {content, parentId, listId, status} = data || {};
		switch (status) {
			case TodoStatus.DOING:
				return this.stmt(StmtNames.TodoSelectList)?.all({listId, content, parentId, isFinish: 0}) || [];
			case TodoStatus.DONE:
				return this.stmt(StmtNames.TodoSelectList)?.all({listId, content, parentId, isFinish: 1}) || [];
			case TodoStatus.DELETED:
				return this.stmt(StmtNames.TodoSelectList)?.all({listId, content, parentId, isFinish: undefined}) || [];
			default:
				return [];
		}
	}

	todoSelect = (data: IHasId) => {
		const {id} = data || {id: 0};
		return this.stmt(StmtNames.TodoSelect)?.get({id});
	}

	todoSelectStatAll = (data: IHasListId) => {
		const {listId} = data || {};
		return this.stmt(StmtNames.TodoSelectStatAll)?.get({listId});
	}

	todoInsert = (data: ITodoInsert) => {
		const {listId, content, parentId = 0} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoInsert)?.run({listId, content, parentId}).changes || 0) > 0).immediate();
	}

	todoDuplicate = (data: ITodoDuplicate) => {
		const {id, parentId} = data || {};
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

	todoUpdate = (data: ITodoUpdate) => {
		const {id, content, comment, isFinish, isDelete, priority, parentId} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoUpdate)?.run({id, content, comment, isFinish: (isFinish === undefined ? undefined : isFinish ? 1 : 0), isDelete: (isDelete === undefined ? undefined : isDelete ? 1 : 0), priority, parentId}).changes || 0) > 0).immediate();
	}

	todoDelete = (data: ITodoDelete) => {
		const {id} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.TodoDelete)?.run({id}).changes || 0) > 0).immediate();
	}

	listTreeSelect = () => {
		const items = this.stmt(StmtNames.ListTreeSelect)?.all() || [];
		const root = {id: 0, key: 0, isLeaf: false, children: []};
		const map = new Map<number, {id: number, key: number, isLeaf: boolean, children: any[]}>([[0, root]]);
		for (const item of items) {
			const {id, parentId, isGroup} = item;
			if (map.has(id)) {
				const node = map.get(id);
				map.set(id, {...item, key: id, isLeaf: !isGroup, children: node!.children});
			} else {
				map.set(id, item);
			}
			if (!map.has(parentId)) {
				map.set(parentId, {id: parentId, key: parentId, isLeaf: false, children: [item]})
			} else {
				const parent = map.get(parentId);
				parent!.children = (parent!.children || []).concat(item);
			}
		}
		return root;
	}

	listNodeSelect = (data: IListSearch) => {
		const {parentId} = data || {};
		const items = this.stmt(StmtNames.ListTreeSelect)?.all({parentId}) || [];
		return items.map(item => ({...item, key: item.id}));
	}

	listInsert = (data: IListInsert) => {
		const {title, parentId = 0, isGroup = false} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.ListInsert)?.run({title, isGroup: isGroup === undefined ? undefined : isGroup ? 1 : 0}).changes || 0) > 0).immediate();
	}

	listUpdate = (data: IListUpdate) => {
		const {id, title, parentId, isDelete} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.ListUpdate)?.run({id, title, parentId, isDelete: (isDelete === undefined ? undefined : isDelete ? 1 : 0)}).changes || 0) > 0).immediate();
	}

	listDelete = (data: IListDelete) => {
		const {id} = data || {};
		return this.db.transaction(() => (this.stmt(StmtNames.ListDelete)?.run({id}).changes || 0) > 0).immediate();
	}
}

export const dbService = new DbService();
