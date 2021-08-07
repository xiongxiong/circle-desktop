import { ITodoNew } from '@/interface/Todo';
import { Connection, createConnection, getCustomRepository } from 'typeorm';
import { Todo } from './entity/Todo';
import { TodoRepository } from './repository/TodoRepository';

class DbService {
	private conn: Connection;

	open = async () => {
		this.conn = await createConnection({
			type: 'better-sqlite3',
			database: 'db/circle.db',
			synchronize: true,
			logging: true,
			entities: [ Todo ],
			migrations: [],
			subscribers: []
		});
	};

	close = async () => {
		if (this.conn) await this.conn.close();
	};

	selectList = () => {
		const repo = getCustomRepository(TodoRepository);
		return repo.find();
	};

	create = async (todo: ITodoNew) => {
		const repo = getCustomRepository(TodoRepository);
		const todoNew = repo.create(todo);
		return repo.save(todoNew);
	};
}

export const dbService = new DbService();
