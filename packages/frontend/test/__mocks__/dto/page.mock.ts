import { PaginatedData } from "query-utils";
import BaseMock from "../base.mock";

export class PageMock<T extends unknown[] = unknown[]> extends BaseMock implements PaginatedData<T> {
    currentPage: number;
    items: T;
    pages: number;
    constructor({ currentPage = 1, items = [] as any, pages = 1 }: Partial<PaginatedData<T>> = {}) {
        super();
        this.items = items;
        this.currentPage = currentPage;
        this.pages = pages;
    }
}
