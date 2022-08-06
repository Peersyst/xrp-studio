import { NftStatus } from "../../../database/entities/Nft";
import { BaseNftDto } from "./base-nft.dto";
import { Paginated } from "../../common/paginated.dto";
import { NftWithCollection } from "../types";

export class NftDto extends BaseNftDto {
    static fromEntity(nftDraft: NftWithCollection): NftDto {
        if (nftDraft.status !== NftStatus.CONFIRMED) throw new Error("An Nft should not have status different than confirmed");

        return super.fromEntity(nftDraft);
    }
}

export class PaginatedNftDto extends Paginated<NftDto> {
    items: NftDto[];
}
