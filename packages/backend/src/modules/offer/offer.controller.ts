import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { CreateOfferRequest } from "./request/create-offer.request";
import { OfferService } from "./offer.service";
import { AcceptOfferRequest } from "./request/accept-offer.request";

@ApiTags("offer")
@Controller("offer")
@ApiErrorDecorators()
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Post()
    @ApiOperation({ description: "Create an Offer" })
    @XummAuthenticated()
    async create(@Request() req, @Body() offerRequest: CreateOfferRequest): Promise<void> {
        return await this.offerService.createOffer(req.user.address, offerRequest);
    }

    @Post()
    @ApiOperation({ description: "Accept an Offer" })
    @XummAuthenticated()
    async accept(@Request() req, @Body() offerRequest: AcceptOfferRequest): Promise<void> {
        return await this.offerService.acceptOffer(req.user.address, offerRequest.id);
    }
}
