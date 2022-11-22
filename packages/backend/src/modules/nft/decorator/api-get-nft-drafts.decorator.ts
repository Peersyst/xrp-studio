import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { ApiBaseGetNftsDecorator } from "./api-base-get-nfts.decorator";
import { NftStatus } from "../../../database/entities/Nft";

export function ApiGetNftDraftsDecorator(): MethodDecorator {
    return applyDecorators(
        ApiBaseGetNftsDecorator(),
        ApiQuery({
            name: "status",
            type: "enum",
            enum: NftStatus,
            required: false,
        }),
    );
}
