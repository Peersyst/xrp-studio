import { ApiProperty } from "@nestjs/swagger";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";

export class GetUserParamsRequest {
    @ApiProperty({
        name: "address",
        type: "string",
        example: "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6",
    })
    @IsXrplAddress()
    address: string;
}
