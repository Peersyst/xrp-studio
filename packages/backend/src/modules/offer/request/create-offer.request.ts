import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsXrplAddress } from "../../common/validator/IsXrplAddress";

export class CreateOfferRequest {
    @ApiProperty({
        name: "nftId",
        type: "number",
        minimum: 1,
        required: true,
    })
    nftId: number;

    @ApiProperty({
        name: "price",
        type: "string",
        description: "Price in drops",
        example: "10000000",
        required: true,
    })
    price: string;

    @ApiProperty({
        name: "destination",
        type: "string",
        required: false,
        maxLength: 255,
        example: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
    })
    @IsOptional()
    @IsXrplAddress()
    destination?: string;

    @ApiProperty({
        name: "expiration",
        type: "number",
        required: false,
        example: "1681468102408",
    })
    @IsOptional()
    expiration?: number;

    @ApiProperty({
        name: "owner",
        type: "string",
        required: false,
        maxLength: 255,
        example: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
    })
    @IsOptional()
    @IsXrplAddress()
    owner?: string;

    @ApiProperty({
        name: "type",
        type: "string",
        required: true,
    })
    type: "sell" | "buy";
}
