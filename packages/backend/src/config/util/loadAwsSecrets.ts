import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Logger } from "@nestjs/common";

export type AwsSecrets = Record<string, any>;

let loaded = false;

export async function waitForAwsSecrets(): Promise<void> {
    while (!loaded) {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

export default async (region: string, SecretId: string): Promise<AwsSecrets> => {
    try {
        const client = new SecretsManagerClient({ region: region });
        const secrets = await client.send(
            new GetSecretValueCommand({
                SecretId,
            }),
        );
        loaded = true;
        return JSON.parse(secrets.SecretString);
    } catch (e) {
        Logger.warn("Could not load config AWS secrets: " + e);
        loaded = true;
        return {};
    }
};
