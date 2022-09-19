import { InfiniteData } from "react-query";
import BaseMock from "../base.mock";

export class InfiniteDataMock<T> extends BaseMock implements InfiniteData<T> {
    pageParams: InfiniteData<T>["pageParams"];
    pages: InfiniteData<T>["pages"];
    constructor({ pageParams = [], pages = [] }: Partial<InfiniteData<T>> = {}) {
        super();
        this.pageParams = pageParams;
        this.pages = pages;
    }
}
