import { Nft, NftStatus } from "../../../database/entities/Nft";
import { Paginated } from "../../common/paginated.dto";
import { NftDto } from "./nft.dto";

export class NftPreviewDto extends NftDto {
    static fromEntity(nft: Nft): NftPreviewDto {
        return {
            id: -1,
            tokenId: "*****",
            mintTransactionHash: "*****",
            flags: 0,
            status: NftStatus.CONFIRMED,
            metadata: {
                name: nft.metadata?.name || "",
                image: nft.metadata?.image || "",
            },
        };
    }
}

export class PaginatedNftPreviewDto extends Paginated<NftPreviewDto> {
    items: NftPreviewDto[];
}
