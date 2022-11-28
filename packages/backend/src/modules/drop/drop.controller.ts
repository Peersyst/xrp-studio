import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { DropDto } from "./dto/drop.dto";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { CreateDropRequest } from "./request/create-drop.request";
import { DropService } from "./drop.service";

@ApiTags("drop")
@Controller("drop")
@ApiErrorDecorators()
export class DropController {
    constructor(private readonly dropService: DropService) {}

    @Get(":id")
    @ApiOperation({ description: "Gets a drop" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getDrop(@Param("id", ParseIntPipe) id: number): Promise<DropDto> {
        return this.dropService.findById(id);
    }

    @Post("")
    @ApiOperation({ description: "Publish a drop" })
    @XummAuthenticated()
    async publishDrop(@Request() req, @Body() createDropRequest: CreateDropRequest): Promise<DropDto> {
        return this.dropService.publish(req.user.address, createDropRequest);
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
    async buy(@Param("id", ParseIntPipe) id: number, @Request() req): Promise<void> {
        return this.dropService.requestBuyNft(req.user.address, id);
    }
}
