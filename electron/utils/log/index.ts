export const syncLog = (func: () => any, desc: string) => {
    try {
        console.log(`${desc} [PREPARE]`);
        const result = func();
        console.log(`${desc} [SUCCESS] : `, result);
    } catch (err) {
        console.log(`${desc} [FAILURE] : `, err);
    }
}

export const asyncLog = (func: () => Promise<any>, desc: string) => Promise.resolve(console.log(`${desc} [PREPARE]`)).then(() => func()).then((res) => console.log(`${desc} [SUCCESS] : `, res)).catch(() => console.log(`${desc} [FAILURE]`));