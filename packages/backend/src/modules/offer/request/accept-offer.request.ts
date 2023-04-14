import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";

export class AcceptOfferRequest {
    @ApiProperty({
        name: "id",
        type: "number",
        minimum: 1,
        required: true,
    })
    id: number;
}
