import 'reflect-metadata';

import { app, BrowserWindow, ipcMain } from 'electron';
import { todoService } from './service/TodoService';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { asyncLog, syncLog } from './utils/log';
import { env } from './utils/env';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
	mainWindow = new BrowserWindow({
		// icon: path.join(assetsPath, 'assets', 'icon.png'),
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

async function registerListeners() {
	/**
   * This comes from bridge integration, check bridge.ts
   */
	ipcMain.on('todo', (event, message) => {
		const result = todoService.on(message);
		if (result instanceof Promise) {
			result.then((data) => event.reply('todo', data)).catch((e) => {
				console.error(e);
				event.reply('todo', undefined);
			});
		} else {
			event.returnValue = result;
		}
	});
	ipcMain.handle('todo', async (event, message) => todoService.on(message));
}

app
	.on('ready', createWindow)
	.whenReady()
	.then(() =>
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Add Extension [SUCCESS]: ${name}`))
			.catch((err) => console.log('Add Extension [FAILURE]: ', err))
	)
	.then(() => {
		if (!env.isTrial()) {
			registerListeners();
			syncLog(todoService.open, 'DATABASE CONNECT');
			return asyncLog(todoService.backup, 'DATABASE BACKUP');
		}
	})
	.catch((e) => console.error(e));

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => {
	if (!env.isTrial()) {
		syncLog(todoService.close, 'DATABASE DISCONNECT');
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
