import { ITodo, ITodoNew } from '@/interface/Todo';
import { env } from '@/utils/env';
import { Connection, createConnection, FindConditions, getCustomRepository, IsNull, Transaction, TransactionRepository } from 'typeorm';
import { Todo } from './entity/Todo';
import { TodoRepository } from './repository/TodoRepository';

class DbService {
	private conn: Connection;

	open = async () => {
		this.conn = await createConnection({
			type: 'better-sqlite3',
			database: env.database(),
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

	@Transaction()
	create(todo: ITodoNew, @TransactionRepository() repo?: TodoRepository) {
		const todoNew = repo?.create({...todo, childrenCount: 0});
		if (todo.parent !== undefined) {
			const {id} = todo.parent;
			repo?.increment({id}, "childrenCount", 1);
		}
		return (todoNew !== undefined) && repo?.save(todoNew);
	};

	@Transaction()
	update(todo: ITodo, @TransactionRepository() repo?: TodoRepository) {
		return repo?.save(todo);
	}

	@Transaction()
	delete(todo: ITodo, @TransactionRepository() repo?: TodoRepository) {
		if (todo.parent !== undefined) {
			const {id} = todo.parent;
			repo?.decrement({id}, "childrenCount", 1);
		}
		const {id} = todo;
		return repo?.delete({id});
	}
}

export const dbService = new DbService();
