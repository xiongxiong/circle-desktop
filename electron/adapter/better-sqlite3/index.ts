import { ITodo, ITodoHasId, ITodoHasParentId, ITodoInsert, ITodoUpdate } from "@/interface/Todo";
import { env } from "@/utils/env";
import BetterSqlite3, {Database, Statement} from "better-sqlite3";


class DbService {

	private db: Database;
	private stmtMap = new Map();

	open = () => {
		const options = env.isDeve() || env.isTest() ? {verbose: console.log} : {};
		this.db = new BetterSqlite3(env.database(), options);

		this.migration();
	};

	close = () => {
		this.db.close();
	};

	private migration = () => {

	}

	private stmt = (name: string, sql: string) => {
		if (!this.stmtMap.get(name)) {
			this.stmtMap.set(name, this.db.prepare(sql));
		}
		return this.stmtMap.get(name);
	}

	todoSelectList = (todo: ITodoHasParentId) => {
		const {parentId} = todo || {};
		return this.stmt('stmtTodoSelectList', 'select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where parentId = @parentId').all({parentId});
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

	todoUpdateIsFinish = (todo: ITodoUpdate) => {
		const now = Date.now();
		const {id, isFinish} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoUpdateIsFinish', 'update todo set updatedAt = @updatedAt, isFinish = @isFinish where id = @id').run({id, isFinish: isFinish ? 1 : 0, updatedAt: now}).changes > 0).immediate();
	}

	todoDelete = (todo: ITodoHasId) => {
		const {id} = todo || {};
		return this.db.transaction(() => this.stmt('stmtTodoDelete', 'delete from todo where id = @id').run({id}).changes > 0).immediate();
	}
}

export const dbService = new DbService();
