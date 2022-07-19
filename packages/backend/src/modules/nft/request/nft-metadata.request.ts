import { ApiProperty } from "@nestjs/swagger";
import { NftMetadataAttributesRequest } from "./nft-metadata-attributes.request";
import { IsHexColor, IsUrl } from "class-validator";

export class NftMetadataRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        required: false,
        maxLength: 256,
        example: "#6409",
    })
    name?: string;

    @ApiProperty({
        name: "description",
        type: "string",
        required: false,
        example: "By BoredApeYachtClub",
    })
    description?: string;

    @ApiProperty({
        name: "image",
        type: "string",
        required: false,
        example: "https://img.seadn.io/files/74359db46e0caf1e692464f4e777b373.png?fit=max&w=600",
    })
    @IsUrl()
    image?: string;

    @ApiProperty({
        name: "backgroundColor",
        description: "NFT backgroundColor in HEX",
        type: "string",
        required: false,
        example: "#FFFFFF",
    })
    @IsHexColor()
    backgroundColor?: string;

    @ApiProperty({
        name: "externalUrl",
        type: "string",
        required: false,
        example: "https://opensea.io/BoredApeYachtClub?tab=created",
    })
    @IsUrl()
    externalUrl?: string;

    @ApiProperty({
        name: "attributes",
        type: NftMetadataAttributesRequest,
        required: false,
        isArray: true,
        example: [
            {
                traitType: "eyes",
                value: "closed",
            },
            {
                traitType: "fur",
                value: "black",
            },
            {
                traitType: "clothes",
                value: "Puffy Vest",
            },
        ],
    })
    attributes?: NftMetadataAttributesRequest;
}
