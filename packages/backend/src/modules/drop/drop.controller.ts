import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { DropDto, PaginatedDropDto } from "./dto/drop.dto";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { CreateDropRequest } from "./request/create-drop.request";
import { DropService } from "./drop.service";
import { RequestBuyNftDto } from "./dto/requestBuyNft.dto";
import { EnhancedQuery } from "../common/decorator/enhanced-query";
import { GetDropsRequest } from "./request/get-drops.request";
import { ApiGetDropsDecorator } from "./decorator/api-get-drops.decorator";
import { DropPaymentRequest } from "./request/drop-payment.request";
import { DropPaymentDto } from "./dto/drop-payment.dto";

@ApiTags("drop")
@Controller("drop")
@ApiErrorDecorators()
export class DropController {
    constructor(private readonly dropService: DropService) {}

    @Get(":id")
    @ApiOperation({ description: "Gets a drop by id" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getDrop(@Param("id", ParseIntPipe) id: number): Promise<DropDto> {
        return this.dropService.findById(id);
    }

    @Get("by-path/:path")
    @ApiOperation({ description: "Gets a drop by drop name and artist name" })
    async getDropByPath(@Param("path") path: string): Promise<DropDto> {
        return this.dropService.findByPath(path);
    }

    @Get()
    @ApiOperation({ description: "Get all Drops" })
    @ApiGetDropsDecorator()
    async getDrops(@EnhancedQuery() queryParams: GetDropsRequest = {}): Promise<PaginatedDropDto> {
        return this.dropService.findAll(queryParams);
    }

    @Post("")
    @ApiOperation({ description: "Publish a drop" })
    @XummAuthenticated()
    async publishDrop(@Request() req, @Body() createDropRequest: CreateDropRequest): Promise<DropDto> {
        return this.dropService.publish(req.user.address, createDropRequest);
    }

    @Post("payment")
    @ApiOperation({ description: "Sends a drop payment request to XUMM" })
    @XummAuthenticated()
    async payment(@Request() req, @Body() dropPaymentRequest: DropPaymentRequest): Promise<DropPaymentDto> {
        return this.dropService.dropPayment(req.user.address, dropPaymentRequest);
    }

    @Post("authorize")
    @ApiOperation({ description: "Sends an minting authorization" })
    @XummAuthenticated()
    async authorize(@Request() req): Promise<void> {
        return this.dropService.requestAuthorization(req.user.address);
    }

    @Post("/:id/buy")
    @ApiOperation({ description: "Buys a random nft from drop that is on sale" })
    @XummAuthenticated()
    async buy(@Param("id", ParseIntPipe) id: number, @Request() req): Promise<RequestBuyNftDto> {
        return this.dropService.requestBuyNft(req.user.address, id);
    }
}
