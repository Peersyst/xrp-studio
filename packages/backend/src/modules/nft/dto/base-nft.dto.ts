import { Nft, NftStatus } from "../../../database/entities/Nft";
import { MetadataDto } from "./metadata.dto";

export class BaseNftDto {
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    status: NftStatus;
    metadata?: MetadataDto;
    account: string;
    collectionId?: number;

    static fromEntity({ id, issuer, transferFee, flags, status, user, collection, metadata }: Nft): BaseNftDto {
        return {
            id,
            issuer,
            transferFee: transferFee ? transferFee / 1000 : undefined,
            flags,
            status,
            metadata: metadata ? MetadataDto.fromEntity(metadata) : undefined,
            account: user.address,
            collectionId: collection?.id,
        };
    }
}
