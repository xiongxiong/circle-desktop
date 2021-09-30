import { DialogActions, IDialogActionMsg } from "@/interface/BridgeMsg";
import { BrowserWindow, dialog } from "electron";
import log from 'electron-log';

export interface IDialogService {
    on: (message: IDialogActionMsg, window?: BrowserWindow) => any;
}

class DialogService implements IDialogService {

    on: (message: IDialogActionMsg, window?: BrowserWindow) => any = async (message: IDialogActionMsg, window?: BrowserWindow) => {
        log.info('message:', message);
		const { action, body } = message;
		switch (action) {
			case DialogActions.MessageBox:
				if (window) {
                    return await dialog.showMessageBox(window, body);
                }
                break;
            case DialogActions.ErrorBox:
                const {title, content} = body;
                dialog.showErrorBox(title, content);
                break;
			default:
				log.error('NOT SUPPORTED ACTION IN [ DialogActions ]');
		}
        return undefined;
    }

}

export const dialogService = new DialogService();

