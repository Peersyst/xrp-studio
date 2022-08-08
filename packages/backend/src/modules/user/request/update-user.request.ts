import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";

export class UpdateUserRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        required: false,
        maxLength: 255,
        example: "user",
    })
    name?: string;

    @ApiProperty({
        name: "description",
        type: "string",
        required: false,
        example: "User description",
    })
    description?: string;

    @ApiProperty({
        name: "image",
        type: "string",
        required: false,
        example: "https://ca.slack-edge.com/T01UF3E38CT-U01USJEK25A-4dc04a491ed6-512",
    })
    @IsOptional()
    @IsUrl()
    image?: string;

    @ApiProperty({
        name: "header",
        type: "string",
        required: false,
        example: "https://cryptospaniards.com/wp-content/uploads/2019/12/Peersyst-2000x1200.jpg",
    })
    @IsOptional()
    @IsUrl()
    header?: string;

    @ApiProperty({
        name: "twitter",
        type: "string",
        required: false,
        maxLength: 255,
        example: "twitter",
    })
    twitter?: string;

    @ApiProperty({
        name: "discord",
        type: "string",
        required: false,
        maxLength: 255,
        example: "discord",
    })
    discord?: string;
}
