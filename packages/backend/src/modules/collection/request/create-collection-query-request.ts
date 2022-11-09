import { ApiProperty } from "@nestjs/swagger";

export class CreateCollectionQueryRequest {
    @ApiProperty({
        name: "publish",
        type: "boolean",
        required: false,
    })
    publish?: boolean;
}
