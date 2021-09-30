import { IMenuActionMsg, MenuActions } from '@/interface/BridgeMsg';
import { BrowserWindow, Menu } from 'electron';
import log from 'electron-log';

export interface IMenuService {
	on: (message: IMenuActionMsg, window?: BrowserWindow) => any;
}

class MenuService implements IMenuService {
	on: (message: IMenuActionMsg, window?: BrowserWindow) => any = async (message: IMenuActionMsg, window?: BrowserWindow) => {
		log.info('message:', message);
		const { action, body } = message;
		switch (action) {
            case MenuActions.ContextMenu:
                if (window) {
                    const menu = Menu.buildFromTemplate(body);
                    menu.popup({window});
                }
                break;
			default:
				log.error('NOT SUPPORTED ACTION IN [ MenuActions ]');
		}
	};
}

export const menuService = new MenuService();
