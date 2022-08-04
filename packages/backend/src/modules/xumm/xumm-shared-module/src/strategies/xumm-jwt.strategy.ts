import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { XummJwtPayloadDTO } from "../dto";

@Injectable()
export class XummJwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("server.secretKey"),
        });
    }

    async validate(payload: XummJwtPayloadDTO): Promise<{ address: string; payloadId: string }> {
        return { address: payload.address, payloadId: payload.payloadId };
    }
}
