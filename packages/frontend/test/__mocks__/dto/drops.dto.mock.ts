import { DropDtoMock, InfiniteDataMock, PaginatedDataMock, XRP_ADDRESS_MOCK } from "test-mocks";
import BaseMock from "../base.mock";

export interface DropsDtoMockType {
    length: number;
    issuer: string;
    drops: DropDtoMock[];
}

export class DropsDtoMock extends BaseMock implements DropsDtoMockType {
    length: number;
    issuer: string;
    drops: DropDtoMock[];
    constructor({ length = 0, issuer = XRP_ADDRESS_MOCK, drops }: Partial<DropsDtoMockType>) {
        super();
        this.length = length;
        this.issuer = issuer;
        this.drops =
            drops ||
            [...Array(length)].map(
                (_, index) =>
                    new DropDtoMock({
                        id: index,
                    }),
            );
    }
}

export interface PaginatedDropsDtoMockParams {
    dropParams?: Partial<DropsDtoMock>;
    pages?: number;
    currentPage?: number;
}

export class PaginatedDropMock extends BaseMock implements InfiniteDataMock<PaginatedDataMock<DropDtoMock[]>> {
    pageParams: number[];
    pages: PaginatedDataMock<DropDtoMock[]>[];
    constructor({ dropParams = {}, pages = 1 }: PaginatedDropsDtoMockParams = {}) {
        super();
        this.pageParams = [];
        this.pages = [...Array(pages)].map(
            (_, index) =>
                new PaginatedDataMock<DropDtoMock[]>({ items: new DropsDtoMock(dropParams).drops, pages, currentPage: index + 1 }),
        );
    }
}
