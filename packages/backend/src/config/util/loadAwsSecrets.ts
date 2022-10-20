import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Logger } from "@nestjs/common";

export type AwsSecrets = Record<string, any>;

export default async (region: string, SecretId: string): Promise<AwsSecrets> => {
    try {
        const client = new SecretsManagerClient({ region: region });
        const secrets = await client.send(
            new GetSecretValueCommand({
                SecretId,
            }),
        );
        return JSON.parse(secrets.SecretString);
    } catch (e) {
        Logger.warn("Could not load config AWS secrets: " + e);
        return {};
    }
};
