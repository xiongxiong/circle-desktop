import { Actions, IActionMsg } from '@/interface/BridgeMsg';
import { ITodoInsert, ITodo } from '@/interface/Todo';
import { IpcMainEvent } from 'electron';
import { dbService } from '../adapter/better-sqlite3';

export interface ITodoService {
	open: () => void;
	close: () => void;
	on: (message: any) => any;
}

class TodoService implements ITodoService {

	open = dbService.open;

	close = dbService.close;

	on: (message: any) => any = async (message: IActionMsg) => {
		console.log('message:', message);
		const { action, body } = message;
		switch (action) {
			case Actions.TodoInsert:
				return dbService.todoInsert(body);
			case Actions.TodoUpdate:
				return dbService.todoUpdate(body);
			case Actions.TodoUpdateIsFinish:
				return dbService.todoUpdateIsFinish(body);
			case Actions.TodoDelete:
				return dbService.todoDelete(body);
			case Actions.TodoSelectList:
				return dbService.todoSelectList(body);
			default:
				console.error('NOT SUPPORTED ACTION IN [ TodoService ]');
		}
	};
}

export const todoService = new TodoService();
