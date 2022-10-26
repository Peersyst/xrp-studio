import { buildConfig } from "./util/config.utils";
import { validPort } from "./util/config.validator";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface RedisConfig {
    host: string;
    port: number;
    password: string;
}

export default (secrets: AwsSecrets): RedisConfig => {
    return buildConfig<RedisConfig>(
        {
            host: {
                default: process.env.REDIS_HOST || secrets.REDIS_HOST || "redis",
                development: "localhost",
            },
            port: {
                default: parseInt(process.env.REDIS_PORT) || parseInt(secrets.REDIS_PORT) || 6379,
            },
            password: {
                default: process.env.REDIS_PASSWORD || secrets.REDIS_PASSWORD || "redis_password",
            },
        },
        {
            port: validPort,
        },
    );
};
