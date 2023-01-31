import { UserDto } from "../../user/dto/user.dto";
import { Paginated } from "../../common/paginated.dto";
import { Collection } from "../../../database/entities/Collection";
import { NftDto } from "../../nft/dto/nft.dto";
import { NftStatus } from "../../../database/entities/Nft";
import { NftDraftDto } from "../../nft/dto/nft-draft.dto";

export class CollectionDto {
    id: number;
    taxon: number;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    items: number;
    account: string;
    path: string;
    user: UserDto;
    nfts?: (NftDto | NftDraftDto)[];

    static fromEntity({ id, taxon, name, description, image, header, user, items, account, path, nfts }: Collection): CollectionDto {
        return {
            id,
            taxon: Number(taxon),
            name,
            description,
            image,
            header,
            items,
            account,
            path,
            user: user && UserDto.fromEntity(user),
            nfts:
                nfts !== undefined &&
                (nfts || []).map((nft) => (nft.status === NftStatus.CONFIRMED ? NftDto.fromEntity(nft) : NftDraftDto.fromEntity(nft))),
        };
    }
}

export class PaginatedCollectionDto extends Paginated<CollectionDto> {
    items: CollectionDto[];
}
