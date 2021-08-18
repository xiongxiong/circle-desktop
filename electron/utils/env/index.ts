interface IEnv {
    isTrial: () => boolean,
    dbFile: () => string,
    dbOptions: () => any,
    dbFileBackup: () => string,
}

class Env implements IEnv {

    isTrial = () => !!process.env.TRIAL;

    dbFile = () => process.env.DBFILE ? process.env.DBFILE : 'db/circle.db';

    dbOptions = () => ({verbose: console.log});

    dbFileBackup = () => `db/backup-${Date.now()}.db`;
}


export const env: IEnv = new Env();