import { ApiProperty } from "@nestjs/swagger";

export class CreateMetadataAttributeRequest {
    @ApiProperty({
        name: "traitType",
        type: "string",
        maxLength: 255,
    })
    traitType: string;

    @ApiProperty({
        name: "value",
        type: "string",
        maxLength: 2624,
    })
    value: string;

    @ApiProperty({
        name: "displayType",
        type: "string",
        maxLength: 255,
        required: false,
        nullable: true,
    })
    displayType?: string;
}
