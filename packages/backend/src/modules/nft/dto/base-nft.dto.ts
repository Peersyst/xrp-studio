import { NftStatus } from "../../../database/entities/Nft";
import { MetadataDto } from "./metadata.dto";
import { CollectionDto } from "../../collection/dto/collection.dto";
import { UserDto } from "../../user/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { NftWithCollection } from "../types";

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

    static fromEntity({ id, issuer, transferFee, flags, status, user, collection, metadata }: NftWithCollection): BaseNftDto {
        return {
            id,
            issuer,
            transferFee: transferFee ? transferFee / 1000 : undefined,
            flags,
            status,
            metadata: metadata ? MetadataDto.fromEntity(metadata) : undefined,
            user: UserDto.fromEntity(user),
            // Safe to add user to collection as it should be a pre condition. This way query is much faster and we are not checking for information we already have. If nft.user and collection.user were different, there'd be a problem
            collection: collection ? CollectionDto.fromEntity({ ...collection, user }) : undefined,
        };
    }
}
