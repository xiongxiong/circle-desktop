import { IMenuActionMsg, MenuActions } from '@/interface/BridgeMsg';
import { BrowserWindow, Menu } from 'electron';

export interface IMenuService {
	on: (message: IMenuActionMsg, window?: BrowserWindow) => any;
}

class MenuService implements IMenuService {
	on: (message: IMenuActionMsg, window?: BrowserWindow) => any = async (message: IMenuActionMsg, window?: BrowserWindow) => {
		console.log('message:', message);
		const { action, body } = message;
		switch (action) {
            case MenuActions.ContextMenu:
                if (window) {
                    const menu = Menu.buildFromTemplate(body);
                    menu.popup({window});
                }
                break;
			default:
				console.error('NOT SUPPORTED ACTION IN [ MenuActions ]');
		}
	};
}

export const menuService = new MenuService();
