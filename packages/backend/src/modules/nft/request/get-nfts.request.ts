import { ApiProperty } from "@nestjs/swagger";
import { BaseGetNftsRequest } from "./base-get-nfts.request";

export class GetNftsRequest extends BaseGetNftsRequest {
    @ApiProperty({
        name: "account",
        type: "string",
        required: false,
    })
    account?: string;
}
