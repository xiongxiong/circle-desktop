import { ITodoHasId, ITodoInsert, ITodoList, ITodoUpdate, ITodoUpdateIsDelete, ITodoUpdateIsFinish } from "@/interface/Todo";
import { env } from "@/utils/env";
import BetterSqlite3, {Database} from "better-sqlite3";


class DbService {

	private db: Database;
	private stmtMap = new Map();

	open = () => {
		this.db = new BetterSqlite3(env.dbFile(), env.dbOptions());

		this.migration();
	}

	close = () => {
		this.db.close();
	}

	backup = () => this.db.backup(env.dbFileBackup());

	restore = async () => {}

	private migration = () => {

	}

	private stmt = (name: string, sql: string) => {
		if (!this.stmtMap.get(name)) {
			this.stmtMap.set(name, this.db.prepare(sql));
		}
		return this.stmtMap.get(name);
	}

	todoSelectList = (todo: ITodoList) => {
		const {parentId, isFinish} = todo || {};
		return this.stmt('stmtTodoSelectList', 'select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where parentId = @parentId and isFinish = @isFinish and isDelete = 0').all({parentId, isFinish: isFinish ? 1 : 0});
	}

	todoSelect = (todo: ITodoHasId) => {
		const {id} = todo || {id: 0};
		return this.stmt('stmtTodoSelect', 'select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where id = @id').get({id});
	}

	todoInsert = (todo: ITodoInsert) => {
		const now = Date.now();
		const {content, parentId} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoInsert', 'insert into todo (content, createdAt, updatedAt, parentId) values (@content, @createdAt, @updatedAt, @parentId)').run({content, parentId, createdAt: now, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdate = (todo: ITodoUpdate) => {
		const now = Date.now();
		const {id, content, isFinish, parentId} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoUpdate', 'update todo set content = @content, updatedAt = @updatedAt, isFinish = @isFinish, parentId = @parentId where id = @id').run({id, content, isFinish: isFinish ? 1 : 0, parentId, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdateIsFinish = (todo: ITodoUpdateIsFinish) => {
		const now = Date.now();
		const {id, isFinish} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoUpdateIsFinish', 'update todo set updatedAt = @updatedAt, isFinish = @isFinish where id = @id').run({id, isFinish: isFinish ? 1 : 0, updatedAt: now}).changes > 0).immediate();
	}

	todoUpdateIsDelete = (todo: ITodoUpdateIsDelete) => {
		const now = Date.now();
		const {id, isDelete} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoUpdateIsDelete', 'update todo set updatedAt = @updatedAt, isDelete = @isDelete where id = @id').run({id, isDelete: isDelete ? 1 : 0, updatedAt: now}).changes > 0).immediate();
	}

	todoDelete = (todo: ITodoHasId) => {
		const {id} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoDelete', 'delete from todo where id = @id').run({id}).changes > 0).immediate();
	}
}

export const dbService = new DbService();
