import { Param, ValidationPipe } from "@nestjs/common";

export const EnhancedParams = () =>
    Param(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
        }),
    );
