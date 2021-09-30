import log from 'electron-log';
import path from 'path';

interface IAppInfo {
    platform?: string,
    name?: string,
    appPath?: string,
    dbPath?: string,
    dbFile?: string,
}

interface IEnv {
    appInfo: () => IAppInfo;
    appName: () => string;
    appPath: () => string;
	isTrial: () => boolean;
	dbPath: () => string;
	dbFile: () => string;
	dbOptions: () => any;
	dbFileBackup: () => string;
}

class Env implements IEnv {
    appInfo = () => ({
        platform: process.platform,
        name: this.appName(),
        appPath: this.appPath(),
        dbPath: this.dbPath(),
        dbFile: this.dbFile(),
    });

    appName = () => 'WonderCircle';

	appPath = () => {
        let home = '';
        log.info('>>> PLATFORM :', process.platform);
		switch (process.platform) {
			case 'darwin':
				home = path.join(process.env.HOME || '', 'Library', 'Application Support');
                break;
			case 'win32':
				home = process.env.APPDATA || '';
                break;
			case 'linux':
				home = process.env.HOME || '';
                break;
			default:
				break;
		}
		return path.join(home, this.appName());
	};

	isTrial = () => !!process.env.TRIAL;

	dbPath = () => (process.env.DBPATH ? process.env.DBPATH : 'db');

	dbFile = () => (process.env.DBFILE ? process.env.DBFILE : 'circle.db');

	dbOptions = () => ({ verbose: log.info });

	dbFileBackup = () => `backup-${Date.now()}.db`;
}

export const env: IEnv = new Env();
