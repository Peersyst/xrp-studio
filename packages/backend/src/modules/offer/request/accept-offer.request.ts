import { ApiProperty } from "@nestjs/swagger";

export class AcceptOfferRequest {
    @ApiProperty({
        name: "id",
        type: "number",
        minimum: 1,
        required: true,
    })
    id: number;
}
