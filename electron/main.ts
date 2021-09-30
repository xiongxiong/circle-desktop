import 'reflect-metadata';

import { app, BrowserWindow, ipcMain } from 'electron';
import { dataService } from './service/DataService';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { uLog, log } from './utils/log';
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
		width: 1000,
		minWidth: 800,
		height: 500,
		minHeight: 500,
		backgroundColor: themeDefault.color.indigo,
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
	ipcMain.on('data', (event, message) => syncMessageHandler('data', event, message));
	ipcMain.handle('data', async (event, message) => dataService.on(message));
	ipcMain.on('dialog', (event, message) => syncMessageHandler('dialog', event, message));
	ipcMain.handle('dialog', async (event, message) => dialogService.on(message, mainWindow));
	ipcMain.on('menu', (event, message) => syncMessageHandler('menu', event, message));
	ipcMain.handle('menu', async (event, message) => menuService.on(message, mainWindow));
}

function syncMessageHandler(channel: string, event: IpcMainEvent, message: any) {
	let result;
	switch (channel) {
		case 'data':
			result = dataService.on(message);
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
		result.then((data) => event.reply('mainMsg', data)).catch((e) => {
			log.error(e);
			event.reply('mainMsg', undefined);
		});
	} else {
		event.returnValue = result;
	}
}

app
	.on('ready', createWindow)
	.whenReady()
	.then(() => uLog(env.appInfo, 'FETCH APP INFO'))
	.then(() => uLog(() => installExtension(REACT_DEVELOPER_TOOLS), 'INSTALL EXTENSION REACT_DEVELOPER_TOOLS'))
	.then(() => uLog(dataService.open, 'DATABASE CONNECT'))
	.then(() => uLog(dataService.init, 'DATABASE INIT'))
	// .then(() => uLog(todoService.backup, 'DATABASE BACKUP'))
	.then(() => uLog(dataService.migrate, 'DATABASE MIGRATE'))
	.then(() => uLog(() => dataService.prepare(), "PREPARE STAMENTS"))
	.then(() => uLog(registerListeners, 'REGISTER LISTENERS'))
	.catch((e) => log.error(e));

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => {
	if (!env.isTrial()) {
		dataService.close();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
