import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { join } from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { APP_FILTER } from "@nestjs/core";
import { CommandModule } from "nestjs-command";
import { TypeORMSeederAdapter } from "./database/seeders/adapter";
import { ErrorFilter } from "./modules/common/exception/error.filter";
import { BullModule } from "@nestjs/bull";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";
import { XummModule } from "xumm-module";
import { XummAuthService } from "./modules/xumm/xumm-auth.service";
import { NftModule } from "./modules/nft/nft.module";
import { CollectionModule } from "./modules/collection/collection.module";
import { IpfsModule } from "@peersyst/ipfs-module/src/ipfs.module";

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
        // TODO: Add registerAsync and inject UserService and config
        XummModule.register(ConfigModule, ConfigService, {}, XummAuthService),
        BlockchainModule,
        NftModule,
        CollectionModule,
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                redis: {
                    host: config.get("redis.host"),
                    port: config.get("redis.port"),
                    password: config.get("redis.password"),
                },
                defaultJobOptions: {
                    removeOnComplete: {
                        age: config.get("bull.age"),
                        count: config.get("bull.count"),
                    },
                },
            }),
        }),
        IpfsModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                pinataApiKey: config.get("pinata.apiKey"),
                pinataSecret: config.get("pinata.secretKey"),
            }),
            inject: [ConfigService],
            imports: [ConfigModule],
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
