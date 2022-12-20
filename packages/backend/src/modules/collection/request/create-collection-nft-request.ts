import { ApiProperty } from "@nestjs/swagger";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { NftFlagsRequest } from "../../nft/request/nft-flags.request";
import { CreateMetadataRequest } from "../../metadata/request/create-metadata.request";

export class CreateCollectionNftRequest {
    @ApiProperty({
        name: "id",
        description: "The id of the nft if its already a draft",
        type: "number",
        required: false,
    })
    @IsOptional()
    id?: number;

    @ApiProperty({
        name: "issuer",
        description: "Issuer of the NFT, if not provided the sender of the transaction acts as the issuer",
        type: "string",
        required: false,
        maxLength: 255,
        example: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
    })
    @IsOptional()
    @IsXrplAddress()
    issuer?: string;

    @ApiProperty({
        name: "transferFee",
        description: "Transfer fee in percentage representing percentages from 0% to 50% with up to 3 decimals",
        type: "number",
        required: false,
        maximum: 50000,
        minimum: 0,
    })
    transferFee?: number;

    @ApiProperty({
        name: "flags",
        description: "NFToken flags",
        type: NftFlagsRequest,
        required: false,
    })
    flags?: NftFlagsRequest;

    @ApiProperty({
        name: "metadata",
        description: "NFT metadata",
        type: CreateMetadataRequest,
        required: false,
    })
    @ValidateNested()
    @Type(() => CreateMetadataRequest)
    metadata?: CreateMetadataRequest;
}
