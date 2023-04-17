import { Nft, NftStatus } from "../../../database/entities/Nft";
import { BaseNftDto } from "./base-nft.dto";
import { Paginated } from "../../common/paginated.dto";
import { OfferDto } from "src/modules/offer/dto/offer.dto";

export class NftDto extends BaseNftDto {
    tokenId: string;
    mintTransactionHash: string;
    uri?: string;
    offers?: OfferDto[];

    static fromEntity(nftDraft: Nft): NftDto {
        if (nftDraft.status !== NftStatus.CONFIRMED) throw new Error("An Nft should not have status different than confirmed");

        const { tokenId, mintTransactionHash, uri } = nftDraft;

        return { tokenId, mintTransactionHash, uri, ...super.fromEntity(nftDraft), offers: nftDraft.offers?.map(OfferDto.fromEntity) };
    }
}

export class PaginatedNftDto extends Paginated<NftDto> {
    items: NftDto[];
}
