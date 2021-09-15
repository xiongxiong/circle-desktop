import { DataActions, IDataActionMsg } from '@/interface/BridgeMsg';
import { dbService } from '../adapter/better-sqlite3';

export interface IDataService {
	open: () => void;
	close: () => void;
	init: () => void;
	migrate: () => void;
	backup: () => Promise<any>;
	restore: () => Promise<any>;
	on: (message: IDataActionMsg) => any;
}

class DataService implements IDataService {
	open = dbService.open;

	close = dbService.close;

	init = dbService.init;

	migrate = dbService.migrate;

	prepare = dbService.prepare;

	backup = dbService.backup;

	restore = dbService.restore;

	on: (message: IDataActionMsg) => any = async (message: IDataActionMsg) => {
		console.log('message:', message);
		const { action, body } = message;
		switch (action) {
			case DataActions.TodoSelectList:
				return dbService.todoSelectList(body);
			case DataActions.TodoSelect:
				return dbService.todoSelect(body);
			case DataActions.TodoSelectRoot:
				return dbService.todoSelectRoot(body);
			case DataActions.TodoSelectStatAll:
				return dbService.todoSelectStatAll(body);
			case DataActions.TodoInsert:
				return dbService.todoInsert(body);
			case DataActions.TodoDuplicate:
				return dbService.todoDuplicate(body);
			case DataActions.TodoUpdate:
				return dbService.todoUpdate(body);
			case DataActions.TodoDelete:
				return dbService.todoDelete(body);
			case DataActions.ListTreeSelect:
				return dbService.listTreeSelect();
			case DataActions.ListNodeSelect:
				return dbService.listNodeSelect(body);
			case DataActions.ListInsert:
				return dbService.listInsert(body);
			case DataActions.ListUpdate:
				return dbService.listUpdate(body);
			case DataActions.ListDelete:
				return dbService.listDelete(body);
			default:
				console.error('NOT SUPPORTED ACTION IN [ TodoActions ]');
		}
	};
}

export const dataService = new DataService();
