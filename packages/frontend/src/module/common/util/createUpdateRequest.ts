export default function <T>(obj: T): Partial<T> {
    const req: Partial<T> = { ...obj };
    for (const key in obj) {
        const val = obj[key] as any;
        if (val === "" || val === null) {
            req[key] = undefined;
        }
    }
    return req;
}
