import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { NftService } from "./nft.service";
import { NftDraftDto, PaginatedNftDraftDto } from "./dto/nft-draft.dto";
import { CreateNftDraftRequest } from "./request/create-nft-draft.request";
import { XummAuthenticated } from "xumm-module";
import { UpdateNftDraftRequest } from "./request/update-nft-draft-request";
import { NftDto, PaginatedNftDto } from "./dto/nft.dto";
import { ApiGetNftsDecorator } from "./decorator/api-get-nfts.decorator";
import { GetNftsRequest } from "./request/get-nfts.request";
import { ApiGetNftDraftsDecorator } from "./decorator/api-get-nft-drafts.decorator";
import { EnhancedQuery } from "../common/decorator/enhanced-query";
import { GetNftDraftsRequest } from "./request/get-nft-drafts.request";

@ApiTags("nft")
@Controller("nft")
@ApiErrorDecorators()
export class NftController {
    constructor(private readonly nftService: NftService) {}

    @Post("draft")
    @ApiOperation({ description: "Create an NFT draft" })
    @XummAuthenticated()
    async createNftDraft(@Request() req, @Body() nftDraft: CreateNftDraftRequest): Promise<NftDraftDto> {
        return this.nftService.createNftDraft(req.user.address, nftDraft);
    }

    @Put("draft/:id")
    @ApiOperation({ description: "Update an NFT draft" })
    @HttpCode(204)
    @XummAuthenticated()
    async updateNftDraft(@Param("id", ParseIntPipe) id: number, @Request() req, @Body() nftDraft: UpdateNftDraftRequest): Promise<void> {
        return this.nftService.updateNftDraft(id, req.user.address, nftDraft);
    }

    @Get()
    @ApiOperation({ description: "Get all NFTs (status = confirmed) paginated" })
    @ApiGetNftsDecorator()
    async getNfts(@EnhancedQuery() queryParams: GetNftsRequest = {}): Promise<PaginatedNftDto> {
        return this.nftService.findAll(queryParams);
    }

    @Get(":id")
    @ApiOperation({ description: "Get a single NFT (status = confirmed)" })
    async getNft(@Param("id", ParseIntPipe) id: number): Promise<NftDto> {
        return this.nftService.findOne(id);
    }

    @Get("draft")
    @ApiOperation({ description: "Get all user NFT drafts (status != confirmed) paginated" })
    @ApiGetNftDraftsDecorator()
    @XummAuthenticated()
    async getNftDrafts(@Request() req, @EnhancedQuery() queryParams: GetNftDraftsRequest = {}): Promise<PaginatedNftDraftDto> {
        return this.nftService.findAllDrafts(req.user.address, queryParams);
    }

    @Get("draft/:id")
    @ApiOperation({ description: "Get a single NFT draft (status != confirmed)" })
    @XummAuthenticated()
    async getNftDraft(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<NftDraftDto> {
        return this.nftService.findOneDraft(id, req.user.address);
    }
}
