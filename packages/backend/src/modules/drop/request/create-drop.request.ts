import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateDropFaqsRequest } from "./create-drop-faqs-request";

export class CreateDropRequest {
    @ApiProperty({
        type: "number",
        required: true,
    })
    collectionId?: number;

    @ApiProperty({
        type: "string",
        required: true,
        pattern: "^[0-9]{1,15}$",
    })
    price: string;

    @ApiProperty({
        type: "string",
        required: true,
        pattern: "^#[0-9A-F]{6}$",
    })
    backgroundColor: string;

    @ApiProperty({
        type: "string",
        required: true,
        pattern: "^#[0-9A-F]{6}$",
    })
    fontColor: string;

    @ApiProperty({
        type: "string",
        required: false,
        maxLength: 1023,
        pattern: "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$",
    })
    videoUrl?: string;

    @ApiProperty({
        type: "string",
        required: false,
        maxLength: 255,
    })
    instagram?: string;

    @ApiProperty({
        type: "string",
        required: false,
        maxLength: 255,
    })
    twitter?: string;

    @ApiProperty({
        type: "string",
        required: false,
        maxLength: 255,
    })
    discord?: string;

    @ApiProperty({
        type: CreateDropFaqsRequest,
        required: true,
        isArray: true,
        maxLength: 255,
    })
    @ValidateNested({ each: true })
    @Type(() => CreateDropFaqsRequest)
    faqs: CreateDropFaqsRequest[];
}
