import BaseMock from "../base.mock";
import { XRP_ADDRESS_MOCK } from "../wallet";
import { NftDtoMock } from "./nft.dto.mock";
import UserDtoMock from "./user.dto.mock";

interface NftsDtoMockType {
    length: number;
    issuer: string;
    nfts: NftDtoMock[];
}

export class NftsDtoMock extends BaseMock implements NftsDtoMockType {
    length: number;
    issuer: string;
    nfts: NftDtoMock[];
    constructor({ length = 1, issuer = XRP_ADDRESS_MOCK, nfts }: Partial<NftsDtoMock> = {}) {
        super();
        this.length = length;
        this.issuer = issuer;
        this.nfts =
            nfts ||
            [...Array(length)].map((index) => new NftDtoMock({ issuer: issuer, id: index, user: new UserDtoMock({ address: issuer }) }));
    }
}

export default NftDtoMock;
