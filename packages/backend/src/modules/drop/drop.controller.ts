import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { DropDto, DropDtoMock } from "./dto/drop.dto";
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
        return DropDtoMock;
    }

    @Post("")
    @ApiOperation({ description: "Publish a drop" })
    @XummAuthenticated()
    async publishDrop(@Request() req, @Body() createDropRequest: CreateDropRequest): Promise<DropDto> {
        return this.dropService.publish("rwEiU5xL5GJUzX1cd7cvaHtf27CS2DYTGf", createDropRequest);
    }
}
