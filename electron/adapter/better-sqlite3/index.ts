import { ITodoHasId, ITodoInsert, ITodoList, ITodoBasic, ITodoUpdateIsDelete, ITodoUpdateIsFinish, ITodoUpdatePriority } from "@/interface/Todo";
import { env } from "@/utils/env";
import { uLog } from "@/utils/log";
import BetterSqlite3, {Database} from "better-sqlite3";
import {initSQL} from './init';


class DbService {

	private db: Database;
	private stmtMap = new Map();

	open = () => {
		this.db = new BetterSqlite3(env.dbFile(), env.dbOptions());
	}

	close = () => {
		this.db.close();
	}

	backup = () => this.db.backup(env.dbFileBackup());

	restore = async () => {}

	init = () => {
		const {count = 0} = this.stmt('_tableCount', 'SELECT COUNT(*) AS count FROM (SELECT type,name,sql,tbl_name FROM "main".sqlite_master)').get();
		console.log("DATABASE TABLE COUNT -- ", count);
		
		if (count === 0) {
			console.log("DATABASE EMPTY > INIT");
			this.db.transaction(() => this.db.exec(initSQL)).immediate();
		}
	}

	migrate = () => {

	}

	private stmt = (name: string, sql: string) => {
		if (!this.stmtMap.get(name)) {
			this.stmtMap.set(name, this.db.prepare(sql));
		}
		return this.stmtMap.get(name);
	}

	todoSelectList = (todo: ITodoList) => {
		const {parentId, isFinish} = todo || {};
		return this.stmt('todoSelectList', 'select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where parentId = @parentId and isFinish = @isFinish and isDelete = 0 order by priority desc').all({parentId, isFinish: isFinish ? 1 : 0});
	}

	todoSelect = (todo: ITodoHasId) => {
		const {id} = todo || {id: 0};
		return this.stmt('todoSelect', 'select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where id = @id').get({id});
	}

	todoInsert = (todo: ITodoInsert) => {
		const now = Date.now();
		const {content, parentId} = todo || {};
		return this.db.transaction(() => this.stmt('todoInsert', 'insert into todo (content, createdAt, updatedAt, parentId) values (@content, @createdAt, @updatedAt, @parentId)').run({content, parentId, createdAt: now, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdateContent = (todo: ITodoBasic) => {
		const now = Date.now();
		const {id, content} = todo || {};
		return this.db.transaction(() => this.stmt('todoUpdate', 'update todo set content = @content, updatedAt = @updatedAt where id = @id').run({id, content, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdateIsFinish = (todo: ITodoUpdateIsFinish) => {
		const now = Date.now();
		const {id, isFinish} = todo || {};
		return this.db.transaction(() => this.stmt('todoUpdateIsFinish', 'update todo set updatedAt = @updatedAt, isFinish = @isFinish where id = @id').run({id, isFinish: isFinish ? 1 : 0, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdateIsDelete = (todo: ITodoUpdateIsDelete) => {
		const now = Date.now();
		const {id, isDelete} = todo || {};
		return this.db.transaction(() => this.stmt('todoUpdateIsDelete', 'update todo set updatedAt = @updatedAt, isDelete = @isDelete where id = @id').run({id, isDelete: isDelete ? 1 : 0, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdatePriority = (todo: ITodoUpdatePriority) => {
		const now = Date.now();
		const {id, priority} = todo || {};
		return this.db.transaction(() => this.stmt('todoUpdatePriority', 'update todo set updatedAt = @updatedAt, priority = @priority where id = @id').run({id, priority, updatedAt: now}).changes > 0).immediate();
	}

	todoDelete = (todo: ITodoHasId) => {
		const {id} = todo || {};
		return this.db.transaction(() => this.stmt('todoDelete', 'delete from todo where id = @id').run({id}).changes > 0).immediate();
	}
}

export const dbService = new DbService();
