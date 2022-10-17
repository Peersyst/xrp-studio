import { ApiProperty } from "@nestjs/swagger";

export class CheckUserNameRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        example: "Manolo",
    })
    name: string;
}
