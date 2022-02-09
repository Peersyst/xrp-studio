import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "@peersyst/auth-module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { join } from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { APP_FILTER } from "@nestjs/core";
import { ErrorFilter } from "./modules/exception/error.filter";
import { CommandModule } from "nestjs-command";
import { TypeORMSeederAdapter } from "./database/seeders/adapter";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            expandVariables: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) =>
                ({
                    type: config.get("database.type"),
                    host: config.get("database.host"),
                    port: config.get("database.port"),
                    username: config.get("database.username"),
                    password: config.get("database.password"),
                    database: config.get("database.database"),
                    synchronize: config.get("database.synchronize"),
                    autoLoadEntities: config.get("database.autoLoadEntities"),
                    entities: config.get("database.entities"),
                    migrations: config.get("database.migrations"),
                    cli: config.get("database.cli"),
                    migrationsRun: config.get("database.migrationsRun"),
                } as any),
        }),
        CommandModule,
        UserModule,
        AuthModule.register(UserModule, ConfigModule, ConfigService, {
            googleAuth: false,
            twitterAuth: false,
        }),
    ],
    providers: [TypeORMSeederAdapter, { provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                ...OpenApiValidator.middleware({
                    apiSpec: join("./openapi-spec.json"),
                    validateRequests: {
                        allowUnknownQueryParameters: true,
                        coerceTypes: false,
                    },
                    validateResponses: false,
                    validateFormats: "full",
                }),
            )
            .forRoutes("*");
    }
}
