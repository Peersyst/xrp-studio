import { Inject, Injectable } from "@nestjs/common";
import { XummService } from "./xumm.service";
import { JwtService } from "@nestjs/jwt";
import { XummSignInResponseDto, XummVerifiedSignInResponseDto, XummJwtPayloadDTO } from "./dto";
import { XummBusinessException } from "./exception/business.exception";
import { XummErrorCode } from "./exception";

@Injectable()
export class XummAuthService {
    constructor(private readonly jwtService: JwtService, @Inject(XummService) private xummService: XummService) {}

    async signIn(): Promise<XummSignInResponseDto> {
        const xummResponse = await this.xummService.signIn();
        const payload: XummJwtPayloadDTO = { verified: false, payloadId: xummResponse.uuid };
        return {
            access_token: this.jwtService.sign(payload),
            xummPayload: xummResponse,
        };
    }

    async verifySignIn(payloadId: string): Promise<XummVerifiedSignInResponseDto> {
        const address = await this.xummService.verifySignIn(payloadId);
        if (!address) {
            throw new XummBusinessException(XummErrorCode.SIGN_IN_NOT_VERIFIED);
        }
        const payload: XummJwtPayloadDTO = { address, verified: true, payloadId };
        const res = {
            address,
            access_token: this.jwtService.sign(payload),
        };
        await this.onSignIn(res);
        return {
            address,
            access_token: this.jwtService.sign(payload),
        };
    }

    //eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    protected async onSignIn(res: XummVerifiedSignInResponseDto): Promise<void> {}
}
