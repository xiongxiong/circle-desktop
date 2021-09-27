const set = new Set();

export const serialAsync = (func: () => any) => {
    if (typeof func !== 'function') {
        console.error("[SERIAL ASYNC] ERROR : NOT A FUNCTION");
        return;
    }
    if (set.has(func)) {
        return;
    }
    set.add(func);
    Promise.resolve(func()).then(_ => {
        set.delete(func);
    });
}
