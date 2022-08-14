import { ApiProperty } from "@nestjs/swagger";
import { BaseGetNftsRequest } from "./base-get-nfts.request";

export enum NftDraftStatus {
    DRAFT = "draft",
    PENDING = "pending",
    FAILED = "failed",
}

export class GetNftDraftsRequest extends BaseGetNftsRequest {
    @ApiProperty({
        name: "status",
        type: "string",
        enum: NftDraftStatus,
        required: false,
    })
    status?: NftDraftStatus;
}
