import { ApiProperty } from "@nestjs/swagger";

export class UpdateNftDraftQueryRequest {
    @ApiProperty({
        name: "publish",
        type: "boolean",
        required: false,
    })
    publish?: boolean;
}
