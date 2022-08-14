import { Nft, NftStatus } from "../../../database/entities/Nft";

export class NftDraftStatusDto {
    id: number;
    status: NftStatus;

    static fromEntity({ id, status }: Nft): NftDraftStatusDto {
        return {
            id,
            status,
        };
    }
}
