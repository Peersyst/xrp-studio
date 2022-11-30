import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { TrendsDto } from "./dto/trends.dto";
import { TrendService } from "./trend.service";

@ApiTags("trend")
@Controller("trend")
@ApiErrorDecorators()
export class TrendController {
    constructor(private readonly trendService: TrendService) {}

    @Get()
    @ApiOperation({ description: "Get trends" })
    async getTrends(): Promise<TrendsDto> {
        return await this.trendService.findTrends();
    }
}
