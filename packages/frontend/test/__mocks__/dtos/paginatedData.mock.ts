import BaseMock from "../base.mock";

interface PageMockType<T> {
    currentPage: number;
    items: T[];
    pages: number;
}

interface DataMockType<T> {
    pageParams: any[];
    pages: PageMockType<T>[];
}

interface PaginedDataMockType<T> {
    data: DataMockType<T>;
}

export class PageMock<T> extends BaseMock implements PageMockType<T> {
    currentPage: number;
    items: T[];
    pages: number;
    constructor({ currentPage = 1, items = [], pages = 1 }: Partial<PageMockType<T>> = {}) {
        super();
        this.items = items;
        this.currentPage = currentPage;
        this.pages = pages;
    }
}

export class PaginatedDataMock<T> extends BaseMock implements PaginedDataMockType<T> {
    data: DataMockType<T>;
    constructor({ items = [], pages = 1, currentPage = 1 }: Partial<PageMockType<T>> = {}) {
        super();
        this.data = {
            pageParams: [],
            pages: [new PageMock({ items, currentPage, pages })],
        };
    }
}
