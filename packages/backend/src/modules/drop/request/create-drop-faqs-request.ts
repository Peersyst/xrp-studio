import { ApiProperty } from "@nestjs/swagger";

export class CreateDropFaqsRequest {
    @ApiProperty({
        type: "string",
        required: true,
        maxLength: 2048,
    })
    question: string;

    @ApiProperty({
        type: "string",
        required: true,
        maxLength: 4096,
    })
    answer: string;
}
