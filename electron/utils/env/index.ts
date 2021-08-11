interface IEnv {
    isDeve: () => boolean,
    isTest: () => boolean,
    isProd: () => boolean,
    database: () => string,
}

class Env implements IEnv {

    private mode = () => process.env.MODE?.toUpperCase();

    isDeve = () => !(this.isTest() || this.isProd());

    isTest = () => this.mode() === 'test';

    isProd = () => this.mode() === 'prod';

    database = () => this.isProd() ? 'db/circle.db' : (this.isTest() ? ':memory:' : 'db/cc.db');
}


export const env: IEnv = new Env();