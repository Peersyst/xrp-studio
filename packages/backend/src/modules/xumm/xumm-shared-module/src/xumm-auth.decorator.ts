import { applyDecorators, ForbiddenException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiException } from "@nanogiants/nestjs-swagger-api-exception-decorator";
import { XummAuthGuard } from "./guards";

export function XummAuthenticated(): MethodDecorator {
    return applyDecorators(
        UseGuards(XummAuthGuard),
        ApiBearerAuth(),
        ApiException(() => UnauthorizedException),
        ApiException(() => ForbiddenException),
    );
}
