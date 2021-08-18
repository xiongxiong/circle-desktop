import { Actions, IActionMsg } from '@/interface/BridgeMsg';
import { dbService } from '../adapter/better-sqlite3';

export interface ITodoService {
	open: () => void;
	close: () => void;
	init: () => void;
	migrate: () => void;
	backup: () => Promise<any>;
	restore: () => Promise<any>;
	on: (message: any) => any;
}

class TodoService implements ITodoService {

	open = dbService.open;

	close = dbService.close;

	init = dbService.init;

	migrate = dbService.migrate;

	backup = dbService.backup;

	restore = dbService.restore;

	on: (message: any) => any = async (message: IActionMsg) => {
		console.log('message:', message);
		const { action, body } = message;
		switch (action) {
			case Actions.TodoSelectList:
				return dbService.todoSelectList(body);
			case Actions.TodoSelect:
				return dbService.todoSelect(body);
			case Actions.TodoInsert:
				return dbService.todoInsert(body);
			case Actions.TodoUpdate:
				return dbService.todoUpdate(body);
			case Actions.TodoUpdateIsFinish:
				return dbService.todoUpdateIsFinish(body);
			case Actions.TodoUpdateIsDelete:
				return dbService.todoUpdateIsDelete(body);
			case Actions.TodoDelete:
				return dbService.todoDelete(body);
			default:
				console.error('NOT SUPPORTED ACTION IN [ TodoService ]');
		}
	};
}

export const todoService = new TodoService();
