import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "./exception/error-response.decorator";
import { XummService } from "./xumm.service";
import { XummTransactionStatusDTO } from "./dto/xumm-transaction-status.dto";
import { XummSignInResponseDto, XummVerifiedSignInResponseDto } from "./dto/xumm-sign-in.response.dto";
import { XummAuthService } from "./xumm-auth.service";
import { XummBusinessException } from "./exception/business.exception";
import { XummErrorCode } from "./exception/error-codes";
import { XummJwtAuthGuard } from "./guards/xumm-jwt-auth.guard";
import { ApiException } from "@nanogiants/nestjs-swagger-api-exception-decorator";

@ApiTags("xumm")
@Controller("xumm")
@ApiErrorDecorators()
export class XummController {
    constructor(private readonly xummService: XummService) {}

    @ApiOperation({ summary: "Get XUMM transaction status by uuid" })
    @Get("status/:uuid")
    async getStatusByUuid(@Param("uuid") uuid: string): Promise<XummTransactionStatusDTO> {
        return {
            status: await this.xummService.getStatus(uuid),
        };
    }
}

@ApiTags("xumm")
@Controller("xumm/auth")
@ApiErrorDecorators()
export class XummAuthController {
    constructor(private readonly xummAuthService: XummAuthService) {}

    @ApiOperation({ summary: "Sign in with XUMM" })
    @Get("sign-in")
    async signIn(): Promise<XummSignInResponseDto> {
        return this.xummAuthService.signIn();
    }

    @ApiOperation({ summary: "Verify sign in with XUMM" })
    @UseGuards(XummJwtAuthGuard)
    @ApiException(() => new XummBusinessException(XummErrorCode.INVALID_CREDENTIALS))
    @Get("verify-sign-in")
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async verifySignIn(@Request() req): Promise<XummVerifiedSignInResponseDto> {
        if (!req.user) {
            throw new XummBusinessException(XummErrorCode.USER_NOT_SIGNED_IN);
        }
        return await this.xummAuthService.verifySignIn(req.user.payloadId);
    }
}
