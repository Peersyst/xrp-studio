import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";

@ApiTags("user")
@Controller("users")
@ApiErrorDecorators()
export class UserController {
    constructor(private readonly userService: UserService) {}
}
