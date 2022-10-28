import BaseMock from "../base.mock";

export class SearchParamsMock extends BaseMock {
    entries: Record<string, string>;
    append = jest.fn(this._append);
    delete = jest.fn(this._delete);
    get = jest.fn(this._get);
    getAll = jest.fn(this._getAll);
    has = jest.fn(this._has);
    set = jest.fn(this._set);
    sort = jest.fn();
    toString = jest.fn();
    forEach = jest.fn();

    _append(key: string, value: string) {
        this.entries = { ...this.entries, [key]: value };
    }

    _delete(key: string) {
        delete this.entries[key];
    }

    _get(key: string) {
        return this.entries[key];
    }

    _getAll() {
        return this.entries;
    }

    _has(key: string) {
        return !!this.entries[key];
    }

    _set(key: string, value: string) {
        this.entries[key] = value;
    }

    constructor(entries: Record<string, string> = {}) {
        super();
        this.entries = entries;
    }
}
