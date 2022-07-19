import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { NftService } from "./nft.service";
import { NftDraftDto } from "./dto/nft-draft.dto";
import { CreateNftDraftRequest } from "./request/create-nft-draft.request";
import { XummAuthenticated } from "xumm-module";

@ApiTags("nft")
@Controller("nfts")
@ApiErrorDecorators()
export class NftController {
    constructor(private readonly nftService: NftService) {}

    @Post("draft")
    @ApiOperation({ description: "Create an NFT draft" })
    @XummAuthenticated()
    async createNftDraft(@Request() req, @Body() nftDraft: CreateNftDraftRequest): Promise<NftDraftDto> {
        return this.nftService.createNftDraft(req.user.address, nftDraft);
    }
}
