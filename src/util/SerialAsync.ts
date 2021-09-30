const set = new Set();

export const serialAsync = (func: () => any) => {
    if (typeof func !== 'function') {
        throw new Error("[SERIAL ASYNC] ERROR : NOT A FUNCTION");
    }
    if (set.has(func)) {
        return;
    }
    set.add(func);
    Promise.resolve(func()).then(_ => {
        set.delete(func);
    });
}
