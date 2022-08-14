import { ApiProperty } from "@nestjs/swagger";
import { BaseGetNftsRequest } from "./base-get-nfts.request";
import { IsOptional } from "class-validator";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";

export class GetNftsRequest extends BaseGetNftsRequest {
    @ApiProperty({
        name: "account",
        type: "string",
        required: false,
    })
    @IsOptional()
    @IsXrplAddress()
    account?: string;
}
