import log from 'electron-log';

const uLog = async (func: () => any, desc: string) => {
	try {
		log.info(`\n>>> ${desc} [PREPARE]`);
		const result = func();
		if (result instanceof Promise) {
			try {
				const res = await result;
				return log.info(`>>> ${desc} [SUCCESS] : `, res);
			} catch (e) {
				return log.info(`>>> ${desc} [FAILURE]`);
			}
		} else {
			return log.info(`>>> ${desc} [SUCCESS] : `, result);
		}
	} catch (err) {
		return log.info(`>>> ${desc} [FAILURE] : `, err);
	}
};

export {uLog, log};
