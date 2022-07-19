import { Nft, NftStatus } from "../../../database/entities/Nft";
import { BaseNftDto } from "./base-nft.dto";

export class NftDraftDto extends BaseNftDto {
    status: Exclude<NftStatus, NftStatus.CONFIRMED>;

    static fromEntity(nftDraft: Nft): NftDraftDto {
        if (nftDraft.status === NftStatus.CONFIRMED) throw new Error("An NftDraft should not have status confirmed");

        return {
            ...super.fromEntity(nftDraft),
            status: nftDraft.status,
        };
    }
}
