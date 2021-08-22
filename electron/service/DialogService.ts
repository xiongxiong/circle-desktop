import { DialogActions, IDialogActionMsg } from "@/interface/BridgeMsg";
import { BrowserWindow, dialog } from "electron";

export interface IDialogService {
    on: (message: IDialogActionMsg, window?: BrowserWindow) => any;
}

class DialogService implements IDialogService {

    on: (message: IDialogActionMsg, window?: BrowserWindow) => any = async (message: IDialogActionMsg, window?: BrowserWindow) => {
        console.log('message:', message);
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
				console.error('NOT SUPPORTED ACTION IN [ DialogActions ]');
		}
    }

}

export const dialogService = new DialogService();

