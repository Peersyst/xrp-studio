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

    @Post("create")
    @ApiOperation({ description: "Create an NFTokenCreateOffer" })
    @XummAuthenticated()
    async create(@Request() req, @Body() offerRequest: CreateOfferRequest): Promise<string> {
        return await this.offerService.createOffer(req.user.address, offerRequest);
    }

    @Post("accept")
    @ApiOperation({ description: "Accept an NFTokenAcceptOffer to buy or sell an NFToken" })
    @XummAuthenticated()
    async accept(@Request() req, @Body() offerRequest: AcceptOfferRequest): Promise<void> {
        return await this.offerService.acceptOffer(req.user.address, offerRequest.id);
    }
}
