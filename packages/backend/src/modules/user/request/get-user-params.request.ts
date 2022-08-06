import { ApiProperty } from "@nestjs/swagger";
import { IsXrplAddress } from "../../nft/validator/IsXrplAddress";

export class GetUserParamsRequest {
    @ApiProperty({
        name: "address",
        type: "string",
        example: "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6",
    })
    @IsXrplAddress()
    address: string;
}
