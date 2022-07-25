import { Nft, NftStatus } from "../../../database/entities/Nft";
import { MetadataDto } from "./metadata.dto";
import { CollectionDto } from "./collection.dto";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BaseNftDto {
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    @ApiProperty({
        type: "enum",
        enum: NftStatus,
    })
    status: NftStatus;
    metadata?: MetadataDto;
    user: UserDto;
    collection?: CollectionDto;

    static fromEntity({ id, issuer, transferFee, flags, status, user, collection, metadata }: Nft): BaseNftDto {
        return {
            id,
            issuer,
            transferFee: transferFee ? transferFee / 1000 : undefined,
            flags,
            status,
            metadata: metadata ? MetadataDto.fromEntity(metadata) : undefined,
            user: UserDto.fromEntity(user),
            collection: collection ? CollectionDto.fromEntity(collection) : undefined,
        };
    }
}
