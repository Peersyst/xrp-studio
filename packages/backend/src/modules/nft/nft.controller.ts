import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { NftService } from "./nft.service";
import { NftDraftDto, PaginatedNftDraftDto } from "./dto/nft-draft.dto";
import { CreateNftDraftRequest } from "./request/create-nft-draft.request";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { UpdateNftDraftRequest } from "./request/update-nft-draft-request";
import { NftDto, PaginatedNftDto } from "./dto/nft.dto";
import { ApiGetNftsDecorator } from "./decorator/api-get-nfts.decorator";
import { GetNftsRequest } from "./request/get-nfts.request";
import { ApiGetNftDraftsDecorator } from "./decorator/api-get-nft-drafts.decorator";
import { EnhancedQuery } from "../common/decorator/enhanced-query";
import { NftDraftStatusRequest } from "./request/nft-draft-status.request";
import { NftDraftStatusDto } from "./dto/nft-draft-status.dto";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { UpdateNftDraftQueryRequest } from "./request/update-nft-draft-query.request";
import { ApiGetNftDraftStatusDecorator } from "./decorator/api-get-nft-draft-status.decorator";
import { TransferFeePipe } from "./pipe/transfer-fee.pipe";
import { NftStatus } from "../../database/entities/Nft";
import { OptionalXummAuthGuard } from "../xumm/optional-xumm-auth";
import { NftPreviewDto } from "./dto/nft-preview.dto";
import { AuctionDto } from "./dto/auction.dto";

@ApiTags("nft")
@Controller("nft")
@ApiErrorDecorators()
export class NftController {
    constructor(private readonly nftService: NftService) {}

    @Post()
    @ApiOperation({ description: "Create an NFT" })
    @XummAuthenticated()
    async createNft(@Request() req, @Body(TransferFeePipe) nftDraft: CreateNftDraftRequest): Promise<NftDraftDto> {
        return await this.nftService.createNftDraft(req.user.address, nftDraft, true);
    }

    @Post("draft")
    @ApiOperation({ description: "Create an NFT draft" })
    @XummAuthenticated()
    async createNftDraft(@Request() req, @Body(TransferFeePipe) nftDraft: CreateNftDraftRequest): Promise<NftDraftDto> {
        return this.nftService.createNftDraft(req.user.address, nftDraft);
    }

    @Put("draft/:id")
    @ApiOperation({ description: "Update an NFT draft" })
    @HttpCode(204)
    @XummAuthenticated()
    async updateNftDraft(
        @Param("id", ParseIntPipe) id: number,
        @Request() req,
        @EnhancedQuery() { publish }: UpdateNftDraftQueryRequest = {},
        @Body(TransferFeePipe) nftDraft: UpdateNftDraftRequest,
    ): Promise<void> {
        return await this.nftService.updateNftDraft(id, req.user.address, nftDraft, publish);
    }

    @Patch("draft/:id/publish")
    @ApiOperation({ description: "Publish an NFT draft" })
    @HttpCode(204)
    @XummAuthenticated()
    async publishNftDraft(@Param("id", ParseIntPipe) id: number, @Request() req): Promise<void> {
        return this.nftService.publishDraft(id, req.user.address);
    }

    @Get()
    @ApiOperation({ description: "Get all NFTs (status = confirmed) paginated" })
    @ApiGetNftsDecorator()
    @UseGuards(OptionalXummAuthGuard)
    async getNfts(@Request() req, @EnhancedQuery() queryParams: GetNftsRequest = new GetNftsRequest()): Promise<PaginatedNftDto> {
        return (await this.nftService.findAll(queryParams, req.user?.address)) as PaginatedNftDto;
    }

    @Get("my")
    @ApiOperation({ description: "Get all user NFT drafts (status != confirmed) paginated" })
    @ApiGetNftDraftsDecorator()
    @XummAuthenticated()
    async getMyNfts(
        @Request() req,
        @EnhancedQuery() queryParams: Omit<GetNftsRequest, "account"> = new GetNftsRequest(),
    ): Promise<PaginatedNftDraftDto> {
        return this.nftService.findAll({ ...queryParams, account: req.user.address }, req.user.address);
    }

    @Get("drop/:id")
    @ApiOperation({ description: "Get all drop NFTs" })
    async getDropNfts(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<NftPreviewDto[]> {
        return this.nftService.findRandomNftsInDrop(id);
    }

    @Get("draft/status")
    @ApiOperation({ description: "Get the status of a single or many NFT drafts" })
    @ApiGetNftDraftStatusDecorator()
    @XummAuthenticated()
    async getNftDraftStatus(@Request() req, @EnhancedQuery() { ids }: NftDraftStatusRequest = {}): Promise<NftDraftStatusDto[]> {
        if (ids) return this.nftService.getNftDraftsStatus(ids, req.user.address);
        else throw new BusinessException(ErrorCode.BAD_DRAFT_STATUS_REQUEST);
    }

    @Get("draft/:id")
    @ApiOperation({ description: "Get a single NFT draft (status != confirmed)" })
    @XummAuthenticated()
    async getNftDraft(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<NftDraftDto> {
        return this.nftService.findOne(
            { id },
            {
                ownerAddress: req.user.address,
                status: [NftStatus.DRAFT, NftStatus.FAILED, NftStatus.PENDING],
                relations: ["metadata", "metadata.attributes", "user", "collection"],
            },
        );
    }

    @Get(":id")
    @ApiOperation({ description: "Get a single NFT (status = confirmed)" })
    async getNft(@Param("id", ParseIntPipe) id: number): Promise<NftDto> {
        return this.nftService.findOne<[NftStatus.CONFIRMED]>(
            { id },
            {
                status: [NftStatus.CONFIRMED],
                relations: ["metadata", "metadata.attributes", "user", "collection", "nftInDrop", "offers"],
            },
        );
    }

    @Delete("/draft/:id")
    @ApiOperation({ description: "Delete an NFT draft (status = draft | failed)" })
    @XummAuthenticated()
    async deleteNftDraft(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.nftService.deleteNftDraft(id, req.user.address);
    }

    @Get("/phygital/:publicKey")
    @ApiOperation({ description: "Get a single NFT (status = confirmed)" })
    async getPhygitalNft(@Param("publicKey") publicKey: string): Promise<NftDto> {
        return this.nftService.findPhygitalNftByPublicKey(publicKey);
    }

    @Get("/auction/:sheetId")
    @ApiOperation({ description: "Get auction by nftId" })
    async getAuctionNft(@Param("sheetId") sheetId: string, @Query("endTimestamp", ParseIntPipe) endTimestamp: number): Promise<AuctionDto> {
        return this.nftService.auctionNft(sheetId, endTimestamp);
    }

    @Get("/sell/:sheetId")
    @ApiOperation({ description: "Is NFT sell" })
    async isNftSell(@Param("sheetId") sheetId: string): Promise<boolean | undefined> {
        return this.nftService.isNftSell(sheetId);
    }
}
