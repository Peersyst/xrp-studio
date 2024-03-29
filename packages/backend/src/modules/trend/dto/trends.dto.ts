import { NftDto } from "../../nft/dto/nft.dto";
import { CollectionDto } from "../../collection/dto/collection.dto";
import { UserDto } from "../../user/dto/user.dto";
import { DropDto } from "src/modules/drop/dto/drop.dto";

export class TrendsDto {
    nfts: NftDto[];
    collections: CollectionDto[];
    artists: UserDto[];
    drops: DropDto[];
}
