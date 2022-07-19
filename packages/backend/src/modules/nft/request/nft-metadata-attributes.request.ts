import { ApiProperty } from "@nestjs/swagger";

export class NftMetadataAttributeRequest {
    @ApiProperty({
        name: "traitType",
        type: "string",
        maxLength: 256,
    })
    traitType: string;

    @ApiProperty({
        name: "value",
        type: "string",
        maxLength: 256,
    })
    value: string;

    @ApiProperty({
        name: "displayType",
        type: "string",
        maxLength: 256,
        required: false,
    })
    displayType?: string;
}

export class NftMetadataAttributesRequest extends Array<NftMetadataAttributeRequest> {}
