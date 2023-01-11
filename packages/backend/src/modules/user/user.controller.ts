import { Body, Controller, Get, HttpCode, Param, Put, Request } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { UserDto } from "./dto/user.dto";
import { EnhancedParams } from "../common/decorator/enhanced-params";
import { GetUserParamsRequest } from "./request/get-user-params.request";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { UpdateUserRequest } from "./request/update-user.request";
import { AvailabilityDto } from "../drop/dto/availability.dto";

@ApiTags("user")
@Controller("user")
@ApiErrorDecorators()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":address")
    @ApiOperation({ description: "Gets a user" })
    async getUser(@EnhancedParams() { address }: GetUserParamsRequest): Promise<UserDto> {
        return this.userService.findOne(address);
    }

    @Get("name-availability/:name")
    @ApiOperation({ description: "Check if the name of a user already exists." })
    async userNameAvailability(@Param("name") name: string): Promise<AvailabilityDto> {
        return { available: await this.userService.userNameIsAvailable(name) };
    }

    @Put()
    @ApiOperation({ description: "Updates a user" })
    @HttpCode(204)
    @XummAuthenticated()
    async updateUser(@Request() req, @Body() user: UpdateUserRequest): Promise<void> {
        return this.userService.updateUser(req.user.address, user);
    }
}
