import { ConnectionOptions } from "typeorm";

export type NestConnectionOptions = ConnectionOptions & {
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    retryDelay?: number;
    retryAttempts?: number;
};

export function getTypeORMConfig(): ConnectionOptions {
    return {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        type: "mysql",
        synchronize: false,
        migrationsRun: true,
        entities: [__dirname + "/../database/entities/*{.ts,.js}"],
        migrations: [__dirname + "/../database/migrations/**/*{.ts,.js}"],
        cli: {
            migrationsDir: __dirname + "/../database/migrations",
        },
    };
}

export function getNestTypeORMConfig(): NestConnectionOptions {
    return {
        ...getTypeORMConfig(),
        autoLoadEntities: true,
    };
}

export default getTypeORMConfig();
