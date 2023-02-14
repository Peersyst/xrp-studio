import { Nft, NftStatus } from "../../../database/entities/Nft";
import { CollectionDto } from "../../collection/dto/collection.dto";
import { UserDto } from "../../user/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MetadataDto } from "../../metadata/dto/metadata.dto";
import { DropDto } from "../../drop/dto/drop.dto";
import { NftInDropStatus } from "../../../database/entities/NftInDrop";

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
    user?: UserDto;
    collection?: CollectionDto;
    drop?: DropDto;

    static fromEntity({ id, issuer, transferFee, flags, status, user, collection, metadata, nftInDrop }: Nft): BaseNftDto {
        const dropSold =
            !nftInDrop ||
            (nftInDrop &&
                (nftInDrop.status === NftInDropStatus.SOLD ||
                    nftInDrop.status === NftInDropStatus.FUNDING ||
                    nftInDrop.status === NftInDropStatus.FUNDED));

        return {
            id,
            issuer,
            transferFee: transferFee ? transferFee : undefined,
            flags,
            status,
            metadata:
                metadata && dropSold
                    ? MetadataDto.fromEntity(metadata)
                    : metadata && !dropSold
                    ? { name: collection?.name, image: "https://xrp-studio-production.s3.eu-west-1.amazonaws.com/cromos-xrp.png" }
                    : undefined,
            user: user && UserDto.fromEntity(user),
            // Safe to add user to collection as it should be a pre condition. This way query is much faster and we are not checking for information we already have. If nft.user and collection.user were different, there'd be a problem
            collection: collection ? CollectionDto.fromEntity({ ...collection, user }) : undefined,
            drop: nftInDrop && nftInDrop.drop && DropDto.fromEntity(nftInDrop.drop),
        };
    }
}
