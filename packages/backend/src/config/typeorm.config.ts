import { ConnectionOptions } from "typeorm";
import { buildConfig, ConfigValidators } from "./util/config.utils";
import { validPort } from "./util/config.validator";
import { AwsSecrets } from "./util/loadAwsSecrets";

export type NestConnectionOptions = ConnectionOptions & {
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    retryDelay?: number;
    retryAttempts?: number;
};

export function getTypeORMConfig(secrets: AwsSecrets = {}): ConnectionOptions {
    return buildConfig<ConnectionOptions>(
        {
            host: {
                default: process.env.DB_HOST || secrets.DB_HOST || "db",
                development: "localhost",
            },
            port: {
                default: parseInt(process.env.DB_PORT) || parseInt(secrets.DB_PORT) || 5432,
            },
            username: {
                default: process.env.DB_USER || secrets.DB_USER || "db_user",
            },
            password: {
                default: process.env.DB_PASSWORD || secrets.DB_PASSWORD || "db_password",
            },
            database: {
                default: process.env.DB_DATABASE || secrets.DB_DATABASE || "db_database",
            },
            type: "postgres",
            synchronize: false,
            migrationsRun: true,
            entities: [__dirname + "/../database/entities/*{.ts,.js}"],
            migrations: [__dirname + "/../database/migrations/**/*{.ts,.js}"],
            cli: {
                migrationsDir: __dirname + "/../database/migrations",
            },
        },
        {
            port: validPort,
        } as ConfigValidators<ConnectionOptions>,
    );
}

export function getNestTypeORMConfig(secrets?: Record<string, string>): NestConnectionOptions {
    return {
        ...getTypeORMConfig(secrets),
        autoLoadEntities: true,
    };
}

export default getTypeORMConfig();
