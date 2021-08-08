import { ITodo, ITodoNew } from '@/interface/Todo';
import { Connection, createConnection, FindConditions, getCustomRepository, IsNull } from 'typeorm';
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

	selectList = (todo?: ITodo) => {
		const repo = getCustomRepository(TodoRepository);
		const options: FindConditions<Todo> | undefined = todo ? { parent: todo } : { parent: IsNull() };
		return repo.find(options);
	};

	create = async (todo: ITodoNew) => {
		const repo = getCustomRepository(TodoRepository);
		const todoNew = repo.create(todo);
		return repo.save(todoNew);
	};

	update = async (todo: ITodo) => {
		const repo = getCustomRepository(TodoRepository);
		return repo.save(todo);
	}
}

export const dbService = new DbService();
