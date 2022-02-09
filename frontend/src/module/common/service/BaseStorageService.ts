export abstract class BaseStorageService<T> {
    protected readonly STORAGE_KEY: string;

    protected constructor(key: string) {
        this.STORAGE_KEY = (process.env.REACT_APP_NAME ? process.env.REACT_APP_NAME + "-" : "") + key;
    }

    set(value: T): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    }

    get(): T | null {
        const item = localStorage.getItem(this.STORAGE_KEY);
        return item ? JSON.parse(item) : null;
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
