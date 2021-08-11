import { env } from "@/utils/env";
import BetterSqlite3, {Database} from "better-sqlite3";


class DbService {

	private db: Database;

	open = async () => {
		const options = env.isDeve() || env.isTest() ? {verbose: console.log} : {};
		this.db = new BetterSqlite3(env.database(), options);
	};

	close = async () => {
		this.db.close();
	};

}

export const dbService = new DbService();
