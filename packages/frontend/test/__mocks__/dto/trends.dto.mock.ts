import { CollectionDto, NftDto, TrendsDto, UserDto } from "module/api/service";

export class TrendsDtoMock implements TrendsDto {
    nfts: Array<NftDto>;
    collections: Array<CollectionDto>;
    artists: Array<UserDto>;

    constructor({ nfts = [], collections = [], artists = [] }: Partial<TrendsDto> = {}) {
        this.nfts = nfts;
        this.collections = collections;
        this.artists = artists;
    }
}
