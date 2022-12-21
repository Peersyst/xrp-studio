import { CollectionDto, NftDto, TrendsDto, UserDto } from "module/api/service";
import BaseMock from "../base.mock";
import { TrendService } from "module/api/service";

export class TrendsDtoMock extends BaseMock implements TrendsDto {
    nfts: Array<NftDto>;
    collections: Array<CollectionDto>;
    artists: Array<UserDto>;

    constructor({ nfts = [], collections = [], artists = [] }: Partial<TrendsDto> = {}) {
        super();
        this.nfts = nfts;
        this.collections = collections;
        this.artists = artists;
        this.mock = jest.spyOn(TrendService, "trendControllerGetTrends").mockResolvedValue(this);
    }
}
