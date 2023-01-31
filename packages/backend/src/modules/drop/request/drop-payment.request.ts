import { ApiProperty } from "@nestjs/swagger";

export class DropPaymentRequest {
    @ApiProperty({
        type: "number",
        required: true,
    })
    collectionId: number;
}
