import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { UserDto } from "../nft/dto/user.dto";
import { EnhancedParams } from "../common/decorator/enhanced-params";
import { GetUserParamsRequest } from "./request/get-user-params.request";

@ApiTags("user")
@Controller("users")
@ApiErrorDecorators()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":address")
    @ApiOperation({ description: "Gets a user" })
    async getUser(@EnhancedParams() { address }: GetUserParamsRequest): Promise<UserDto> {
        return this.userService.findOne(address);
    }
}
