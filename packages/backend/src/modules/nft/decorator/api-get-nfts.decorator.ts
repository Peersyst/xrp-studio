import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { ApiBaseGetNftsDecorator } from "./api-base-get-nfts.decorator";

export function ApiGetNftsDecorator(): MethodDecorator {
    return applyDecorators(
        ApiBaseGetNftsDecorator(),
        ApiQuery({
            name: "account",
            type: "string",
            required: false,
        }),
    );
}
