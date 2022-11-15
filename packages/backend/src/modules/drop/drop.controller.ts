import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { DropDto, DropDtoMock } from "./dto/drop.dto";

@ApiTags("drop")
@Controller("drop")
@ApiErrorDecorators()
export class DropController {
    @Get(":id")
    @ApiOperation({ description: "Gets a drop" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getDrop(@Param("id", ParseIntPipe) id: number): Promise<DropDto> {
        return DropDtoMock;
    }
}
