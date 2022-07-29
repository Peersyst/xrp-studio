import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { XummJwtPayloadDTO } from "../dto/xumm-jwt-payload.dto";
import { XummBusinessException } from "../exception/business.exception";
import { XummErrorCode } from "../exception/error-codes";

@Injectable()
export class XummAuthStrategy extends PassportStrategy(Strategy, "xumm") {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("server.secretKey"),
        });
    }

    async validate(payload: XummJwtPayloadDTO): Promise<{ address: string; payloadId: string }> {
        if (!payload.verified || !payload.address) {
            throw new XummBusinessException(XummErrorCode.SIGN_IN_NOT_VERIFIED);
        }
        return { address: payload.address, payloadId: payload.payloadId };
    }
}
