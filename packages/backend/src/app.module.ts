import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config";
import { join } from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { APP_FILTER } from "@nestjs/core";
import { CommandModule } from "nestjs-command";
import { TypeORMSeederAdapter } from "./database/seeders/adapter";
import { ErrorFilter } from "./modules/common/exception/error.filter";
import { BullModule } from "@nestjs/bull";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";
import { XummModule } from "@peersyst/xumm-module";
import { XummAuthService } from "./modules/xumm/xumm-auth.service";
import { NftModule } from "./modules/nft/nft.module";
import { CollectionModule } from "./modules/collection/collection.module";
import { IpfsModule } from "@peersyst/ipfs-module/src/ipfs.module";
import { FileModule } from "./modules/file/file.module";
import { StorageModule, StorageType } from "@peersyst/storage-module/src/storage.module";
import { waitForAwsSecrets } from "./config/util/loadAwsSecrets";
import { DropModule } from "./modules/drop/drop.module";
import { XummTransactionModule } from "./modules/xumm/xumm-transaction.module";
import { TrendModule } from "./modules/trend/trend.module";
import { OfferModule } from "./modules/offer/offer.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [async () => configuration()],
            expandVariables: true,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                await waitForAwsSecrets();
                return {
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
                } as any;
            },
        }),
        CommandModule,
        UserModule,
        XummModule.forRootAsync({
            enableAuth: true,
            enableStatus: true,
            inject: [ConfigService],
            imports: [UserModule],
            useFactory: (config: ConfigService) => ({
                jwt: { secret: config.get("server.secretKey") },
            }),
            useXummAuthProvider: XummAuthService,
        }),
        BlockchainModule,
        NftModule,
        CollectionModule,
        DropModule,
        FileModule,
        OfferModule,
        XummTransactionModule,
        TrendModule,
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
        StorageModule.registerAsync({
            useFactory: async (config: ConfigService) => {
                await waitForAwsSecrets();
                return {
                    storageType: StorageType.S3,
                    awsRegion: config.get("aws.region"),
                    awsAccessKeyId: config.get("aws.accessKeyId"),
                    awsSecretAccessKey: config.get("aws.secretAccessKey"),
                    awsBucket: config.get("aws.bucketName"),
                };
            },
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
