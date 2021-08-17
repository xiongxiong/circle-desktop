interface IEnv {
    isDev: () => boolean,
    isTest: () => boolean,
    isProd: () => boolean,
    isTrial: () => boolean,
    dbFile: () => string,
    dbFileBackup: () => string,
}

class Env implements IEnv {

    private mode = () => process.env.MODE?.toUpperCase();

    isDev = () => !(this.isTest() || this.isProd() || this.isTrial());

    isTest = () => this.mode() === 'TEST';

    isProd = () => this.mode() === 'PROD';

    isTrial = () => this.mode() === 'TRIAL';

    dbFile = () => this.isProd() ? 'db/circle.db' : (this.isTest() ? ':memory:' : 'db/cc.db');

    dbFileBackup = () => `db/backup-${Date.now()}.db`;
}


export const env: IEnv = new Env();