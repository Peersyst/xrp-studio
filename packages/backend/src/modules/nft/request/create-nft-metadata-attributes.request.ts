import { ApiProperty } from "@nestjs/swagger";

export class CreateNftMetadataAttributeRequest {
    @ApiProperty({
        name: "traitType",
        type: "string",
        maxLength: 255,
    })
    traitType: string;

    @ApiProperty({
        name: "value",
        type: "string",
        maxLength: 255,
    })
    value: string;

    @ApiProperty({
        name: "displayType",
        type: "string",
        maxLength: 255,
        required: false,
    })
    displayType?: string;
}
