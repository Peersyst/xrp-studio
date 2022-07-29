import { Query, ValidationPipe } from "@nestjs/common";

export const EnhancedQuery = () =>
    Query(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
        }),
    );
