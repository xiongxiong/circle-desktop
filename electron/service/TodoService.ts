import { TodoActions, ITodoActionMsg } from '@/interface/BridgeMsg';
import { dbService } from '../adapter/better-sqlite3';

export interface ITodoService {
	open: () => void;
	close: () => void;
	init: () => void;
	migrate: () => void;
	backup: () => Promise<any>;
	restore: () => Promise<any>;
	on: (message: ITodoActionMsg) => any;
}

class TodoService implements ITodoService {
	open = dbService.open;

	close = dbService.close;

	init = dbService.init;

	migrate = dbService.migrate;

	prepare = dbService.prepare;

	backup = dbService.backup;

	restore = dbService.restore;

	on: (message: ITodoActionMsg) => any = async (message: ITodoActionMsg) => {
		console.log('message:', message);
		const { action, body } = message;
		switch (action) {
			case TodoActions.TodoSelectList:
				return dbService.todoSelectList(body);
			case TodoActions.TodoSelect:
				return dbService.todoSelect(body);
			case TodoActions.TodoInsert:
				return dbService.todoInsert(body);
			case TodoActions.TodoDuplicate:
				return dbService.todoDuplicate(body);
			case TodoActions.TodoUpdate:
				return dbService.todoUpdate(body);
			case TodoActions.TodoDelete:
				return dbService.todoDelete(body);
			default:
				console.error('NOT SUPPORTED ACTION IN [ TodoActions ]');
		}
	};
}

export const todoService = new TodoService();
