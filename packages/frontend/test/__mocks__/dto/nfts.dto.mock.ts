import { NftDto, PaginatedNftDto } from "module/api/service";
import BaseMock from "../base.mock";
import { XRP_ADDRESS_MOCK } from "../wallet";
import { NftDtoMock } from "./nft.dto.mock";
import { InfiniteDataMock } from "./infinite-data";
import { UserDtoMock } from "./user.dto.mock";
import { PaginatedDataMock } from "./paginated-data.mock";

export interface NftsDtoMockType {
    length: number;
    issuer: string;
    nfts: NftDtoMock[];
}

export interface PaginatedNftsDtoMockParams {
    nftsParams?: Partial<NftsDtoMock>;
    pages?: number;
    currentPage?: number;
}

export class NftsDtoMock extends BaseMock implements NftsDtoMockType {
    length: number;
    issuer: string;
    nfts: NftDtoMock[];
    constructor({ length = 0, issuer = XRP_ADDRESS_MOCK, nfts }: Partial<NftsDtoMock> = {}) {
        super();
        this.length = length;
        this.issuer = issuer;
        this.nfts =
            nfts ||
            [...Array(length)].map((index) => new NftDtoMock({ issuer: issuer, id: index, user: new UserDtoMock({ address: issuer }) }));
    }
}

export class PaginatedNftsMock extends BaseMock implements InfiniteDataMock<PaginatedDataMock> {
    pageParams: number[];
    pages: PaginatedDataMock[];
    constructor({ nftsParams = {}, pages = 1 }: PaginatedNftsDtoMockParams = {}) {
        super();
        this.pageParams = [];
        this.pages = [...Array(pages)].map(
            (index) => new PaginatedDataMock({ items: new NftsDtoMock(nftsParams).nfts, pages, currentPage: index + 1 }),
        );
    }
}

export default NftDtoMock;
