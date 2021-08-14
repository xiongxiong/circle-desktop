import { ITodo, ITodoHasId, ITodoHasParentId, ITodoInsert, ITodoUpdate } from "@/interface/Todo";
import { env } from "@/utils/env";
import BetterSqlite3, {Database, Statement} from "better-sqlite3";


class DbService {

	private db: Database;

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

	private stmtTodoSelectList: Statement;

	todoSelectList = (todo: ITodoHasParentId) => {
		if (!this.stmtTodoSelectList) {
			this.stmtTodoSelectList = this.db.prepare('select id, content, createdAt, updatedAt, isFinish, parentId, childrenCount, childrenFinish, priority from todo where parentId = @parentId');
		}
		const {parentId} = todo || {};
		return this.stmtTodoSelectList.all({parentId});
	}

	private stmtTodoInsert: Statement;

	todoInsert = (todo: ITodoInsert) => {
		if (!this.stmtTodoInsert) {
			this.stmtTodoInsert = this.db.prepare('insert into todo (content, createdAt, updatedAt, parentId) values (@content, @createdAt, @updatedAt, @parentId)');
		}
		const now = Date.now();
		const {content, parentId} = todo || {};
		return this.db.transaction(() => this.stmtTodoInsert.run({content, parentId, createdAt: now, updatedAt: now}).changes > 0).immediate();
	}

	private stmtTodoUpdate: Statement;

	todoUpdate = (todo: ITodoUpdate) => {
		if (!this.stmtTodoUpdate) {
			this.stmtTodoUpdate = this.db.prepare('update todo set content = @content, updatedAt = @updatedAt, isFinished = @isFinished, parentId = @parentId where id = @parentId');
		}
		const now = Date.now();
		const {content, isFinish, parentId} = todo || {};
		return this.db.transaction(() => this.stmtTodoUpdate.run({content, isFinish, parentId, updatedAt: now}).changes > 0).immediate();
	}

	private stmtTodoDelete: Statement;

	todoDelete = (todo: ITodoHasId) => {
		if (!this.stmtTodoDelete) {
			this.stmtTodoDelete = this.db.prepare('delete from todo where id = @id');
		}
		const {id} = todo || {};
		return this.db.transaction(() => this.stmtTodoDelete.run({id}).changes > 0).immediate();
	}
}

export const dbService = new DbService();
