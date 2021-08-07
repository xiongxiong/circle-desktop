interface ILog {
	withTags: (...tags: (string | number)[]) => ILog;
	log: (...data: any[]) => ILog;
}

class Log implements ILog {
    private tags?: (string | number)[] | undefined;

    withTags(...tags: (string | number)[]) {
		this.tags = tags;
        return this;
	}

	log(...data: any[]) {
        const tagStr = this.tags?.reduce((s, tag) => s + ' >> ' + tag, '\n');
        for (let item of data) {
            switch (typeof item) {
                case 'function':
                    try {
                        console.log(tagStr, '-- PREPARE')
                        const result = item()
                        if (result instanceof Promise) {
                            result.then(r => console.log(tagStr, '-- SUCCESS', r))
                        } else {
                            console.log(tagStr, '-- SUCCESS', result)
                        }
                    } catch (e) {
                        console.error(tagStr, '-- FAILURE', e)
                    }
                    break;
                default:
                    console.log(data);
                    break;
            }
        }
        return this;
    }
}

export const logger: () => ILog = () => new Log();

export const log = logger().log;
