import 'reflect-metadata';

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import { todoService } from './service/TodoService';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { uLog } from './utils/log';
import { env } from './utils/env';
import { themeDefault } from '~/styles/Themes';
import path from 'path';
import { IpcMainEvent } from 'electron/main';
import { dialogService } from './service/DialogService';
import { menuService } from './service/MenuService';

let mainWindow: BrowserWindow | undefined;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath = process.env.NODE_ENV === 'production' ? process.resourcesPath : app.getAppPath();

function createWindow() {
	mainWindow = new BrowserWindow({
		icon: path.join(assetsPath, 'assets', 'icon.png'),
		// titleBarStyle: 'hiddenInset',
		width: 800,
		height: 500,
		backgroundColor: themeDefault.color0,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	mainWindow.on('closed', () => {
		mainWindow = undefined;
	});
}

async function registerListeners() {
	ipcMain.on('todo', (event, message) => syncMessageHandler('todo', event, message));
	ipcMain.handle('todo', async (event, message) => todoService.on(message));
	ipcMain.on('dialog', (event, message) => syncMessageHandler('dialog', event, message));
	ipcMain.handle('dialog', async (event, message) => dialogService.on(message, mainWindow));
	ipcMain.on('menu', (event, message) => syncMessageHandler('menu', event, message));
	ipcMain.handle('menu', async (event, message) => menuService.on(message, mainWindow));
}

function syncMessageHandler(channel: string, event: IpcMainEvent, message: any) {
	let result;
	switch (channel) {
		case 'todo':
			result = todoService.on(message);
			break;
		case 'dialog':
			result = dialogService.on(message, mainWindow);
			break;
		case 'menu':
			result = menuService.on(message, mainWindow);
			break;
		default:
			break;
	}
	if (result instanceof Promise) {
		result.then((data) => event.reply('todo', data)).catch((e) => {
			console.error(e);
			event.reply('todo', undefined);
		});
	} else {
		event.returnValue = result;
	}
}

app
	.on('ready', createWindow)
	.whenReady()
	.then(() => uLog(() => installExtension(REACT_DEVELOPER_TOOLS), 'INSTALL EXTENSION REACT_DEVELOPER_TOOLS'))
	.then(() => uLog(todoService.open, 'DATABASE CONNECT'))
	.then(() => uLog(() => todoService.prepare(), "PREPARE STAMENTS"))
	.then(() => uLog(todoService.init, 'DATABASE INIT'))
	.then(() => uLog(todoService.migrate, 'DATABASE MIGRATE'))
	// .then(() => uLog(todoService.backup, 'DATABASE BACKUP'))
	.then(() => uLog(registerListeners, 'REGISTER LISTENERS'))
	.catch((e) => console.error(e));

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => {
	if (!env.isTrial()) {
		uLog(todoService.close, 'DATABASE DISCONNECT');
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
