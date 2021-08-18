export const uLog = (func: () => any, desc: string) => {
    try {
        console.log(`\n>>> ${desc} [PREPARE]`);
        const result = func();
        if (result instanceof Promise) {
            return result.then((res) => console.log(`>>> ${desc} [SUCCESS] : `, res)).catch(() => console.log(`>>> ${desc} [FAILURE]`));
        } else {
            console.log(`>>> ${desc} [SUCCESS] : `, result);
        }
    } catch (err) {
        console.log(`>>> ${desc} [FAILURE] : `, err);
    }
}