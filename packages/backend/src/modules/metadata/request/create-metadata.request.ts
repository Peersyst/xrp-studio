import { ApiProperty } from "@nestjs/swagger";
import { CreateMetadataAttributeRequest } from "./create-metadata-attributes.request";
import { IsHexColor, IsUrl, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateMetadataRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        required: false,
        maxLength: 255,
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
    @IsOptional()
    @IsUrl()
    image?: string;

    @ApiProperty({
        name: "backgroundColor",
        description: "NFT backgroundColor in HEX",
        type: "string",
        required: false,
        example: "#FFFFFF",
    })
    @IsOptional()
    @IsHexColor()
    backgroundColor?: string;

    @ApiProperty({
        name: "externalUrl",
        type: "string",
        required: false,
        example: "https://opensea.io/BoredApeYachtClub?tab=created",
    })
    @IsOptional()
    @IsUrl()
    externalUrl?: string;

    @ApiProperty({
        name: "attributes",
        type: CreateMetadataAttributeRequest,
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
    @ValidateNested({ each: true })
    @Type(() => CreateMetadataAttributeRequest)
    attributes?: CreateMetadataAttributeRequest[];
}
