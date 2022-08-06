import { JwtService } from "@nestjs/jwt";
import { XummAuthService as BaseXummAuthService, XummService, XummVerifiedSignInResponseDto } from "@peersyst/xumm-module";
import { Inject } from "@nestjs/common";
import { UserService } from "../user/user.service";

export class XummAuthService extends BaseXummAuthService {
    constructor(jwtService: JwtService, xummService: XummService, @Inject(UserService) private readonly userService: UserService) {
        super(jwtService, xummService);
    }

    async onSignIn({ address }: XummVerifiedSignInResponseDto): Promise<void> {
        await this.userService.createIfNotExists(address);
    }
}
