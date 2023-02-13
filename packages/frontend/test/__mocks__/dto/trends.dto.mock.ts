import { CollectionDto, DropDto, NftDto, TrendsDto, UserDto } from "module/api/service";
import BaseMock from "../base.mock";
import { TrendService } from "module/api/service";

export class TrendsDtoMock extends BaseMock implements TrendsDto {
    nfts: Array<NftDto>;
    collections: Array<CollectionDto>;
    artists: Array<UserDto>;
    drops: Array<DropDto>;

    constructor({ nfts = [], collections = [], artists = [], drops = [] }: Partial<TrendsDto> = {}) {
        super();
        this.nfts = nfts;
        this.collections = collections;
        this.artists = artists;
        this.drops = drops;
        this.mock = jest.spyOn(TrendService, "trendControllerGetTrends").mockResolvedValue(this);
    }
}
