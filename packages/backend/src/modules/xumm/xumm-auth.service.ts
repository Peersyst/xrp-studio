import { JwtService } from "@nestjs/jwt";
import { XummAuthService as BaseXummAuthService, XummService, XummVerifiedSignInResponseDto } from "xumm-module";

export class XummAuthService extends BaseXummAuthService {
    constructor(jwtService: JwtService, xummService: XummService) {
        super(jwtService, xummService);
    }

    async onSignIn({ address }: XummVerifiedSignInResponseDto): Promise<void> {
        // eslint-disable-next-line no-console
        console.log(address);
    }
}
