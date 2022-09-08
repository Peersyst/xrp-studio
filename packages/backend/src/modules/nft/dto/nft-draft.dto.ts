import { NftStatus } from "../../../database/entities/Nft";
import { BaseNftDto } from "./base-nft.dto";
import { Paginated } from "../../common/paginated.dto";
import { NftWithCollection } from "../types";

export class NftDraftDto extends BaseNftDto {
    static fromEntity(nftDraft: NftWithCollection): NftDraftDto {
        if (nftDraft.status === NftStatus.CONFIRMED) throw new Error("An NftDraft should not have status confirmed");

        return super.fromEntity(nftDraft);
    }
}

export class PaginatedNftDraftDto extends Paginated<NftDraftDto> {
    items: NftDraftDto[];
}
