import BaseMock from "../base.mock";
import { XRP_ADDRESS_MOCK } from "../wallet";
import { NftDtoMock } from "./nft.dto.mock";
import { InfiniteDataMock } from "./infinite-data";
import { UserDtoMock } from "./user.dto.mock";
import { PaginatedDataMock } from "./paginated-data.mock";
import { CollectionDtoMock } from "./collection.dto.mock";

export interface CollectionsDtoMockType {
    length: number;
    issuer: string;
    collections: CollectionDtoMock[];
}

export class CollectionsDtoMock extends BaseMock implements CollectionsDtoMockType {
    length: number;
    issuer: string;
    collections: CollectionDtoMock[];
    constructor({ length = 0, issuer = XRP_ADDRESS_MOCK, collections }: Partial<CollectionsDtoMockType> = {}) {
        super();
        this.length = length;
        this.issuer = issuer;
        this.collections =
            collections ||
            [...Array(length)].map((_, index) => new CollectionDtoMock({ id: index, user: new UserDtoMock({ address: issuer }) }));
    }
}

export interface PaginatedCollectionsDtoMockParams {
    collectionParams?: Partial<CollectionsDtoMock>;
    pages?: number;
    currentPage?: number;
}

export class PaginatedCollectionMock extends BaseMock implements InfiniteDataMock<PaginatedDataMock<CollectionDtoMock[]>> {
    pageParams: number[];
    pages: PaginatedDataMock<CollectionDtoMock[]>[];
    constructor({ collectionParams = {}, pages = 1 }: PaginatedCollectionsDtoMockParams = {}) {
        super();
        this.pageParams = [];
        this.pages = [...Array(pages)].map(
            (_, index) =>
                new PaginatedDataMock<CollectionDtoMock[]>({
                    items: new CollectionsDtoMock(collectionParams).collections,
                    pages,
                    currentPage: index + 1,
                }),
        );
    }
}

export default NftDtoMock;
