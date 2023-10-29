import * as crypto from "crypto";
import { buildConfig } from "./util/config.utils";
import { validB64Key, validPort } from "./util/config.validator";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface ServerConfig {
    port: number;
    basePath: string;
    secretKey: string;
    encryptionKey: string;
    enableSwagger: boolean;
    enableCors: boolean;
    enableBullBoard: boolean;
    googlePrivateApiKey: string;
    googleClientEmail: string;
}

export default (secrets: AwsSecrets): ServerConfig => {
    return buildConfig<ServerConfig>(
        {
            port: parseInt(process.env.APP_PORT) || {
                default: 3000,
                development: 3001,
            },
            basePath: "",
            secretKey: process.env.APP_JWT_KEY || {
                default: crypto.randomBytes(32).toString("base64"),
                development: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                production: secrets.APP_JWT_KEY,
            },
            encryptionKey: process.env.APP_ENCRYPTION_KEY || {
                default: crypto.randomBytes(32).toString("base64"),
                development: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                production: secrets.APP_ENCRYPTION_KEY,
            },
            enableSwagger: {
                default: true,
                production: false,
            },
            enableCors: {
                default: true,
                production: false,
            },
            enableBullBoard: {
                default: true,
                production: false,
            },
            googlePrivateApiKey: process.env.GOOGLE_PRIVATE_API_KEY || secrets.GOOGLE_PRIVATE_API_KEY,
            googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL || secrets.GOOGLE_CLIENT_EMAIL,
        },
        {
            port: validPort,
            secretKey: validB64Key,
            encryptionKey: validB64Key,
        },
    );
};
