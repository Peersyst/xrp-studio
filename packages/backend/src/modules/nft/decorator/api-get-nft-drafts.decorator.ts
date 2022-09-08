import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { ApiBaseGetNftsDecorator } from "./api-base-get-nfts.decorator";
import { NftDraftStatus } from "../request/get-nft-drafts.request";

export function ApiGetNftDraftsDecorator(): MethodDecorator {
    return applyDecorators(
        ApiBaseGetNftsDecorator(),
        ApiQuery({
            name: "status",
            type: "enum",
            enum: NftDraftStatus,
            required: false,
        }),
    );
}
