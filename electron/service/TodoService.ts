import { Actions, IActionMsg } from '@/interface/BridgeMsg';
import { ITodoNew, ITodo } from '@/interface/Todo';
import { IpcMainEvent } from 'electron';
import { dbService } from '../adapter/typeorm';

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
			case Actions.TodoCreate:
				return dbService.create(body);
			case Actions.TodoUpdate:
				return dbService.update(body);
			case Actions.TodoList:
				return dbService.selectList(body);
			default:
				console.error('NOT SUPPORTED ACTION IN [ TodoService ]');
		}
	};
}

export const todoService = new TodoService();
