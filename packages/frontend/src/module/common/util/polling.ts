export interface PollingOptions {
    delay?: number;
    maxIterations?: number;
}

async function polling<R>(fn: () => Promise<R>, condition: (res: R) => boolean, options: PollingOptions = {}, i = 0): Promise<R> {
    const { delay = 1000, maxIterations } = options;
    if (i === maxIterations) throw new Error("Polling executed the maximum number iterations");
    const res = await fn();
    if (condition(res)) {
        return new Promise<R>((resolve, reject) => {
            setTimeout(async () => {
                const nextRes = await polling(fn, condition, options, i + 1).catch((e) => reject(e));
                if (nextRes) resolve(nextRes);
            }, delay);
        });
    } else return res;
}

async function higherOrderPolling<R>(fn: () => Promise<R>, condition: (res: R) => boolean, options?: PollingOptions) {
    return polling(fn, condition, options);
}

export default higherOrderPolling;
