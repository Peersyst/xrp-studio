import { buildConfig } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface AuctionConfig {
    googlePrivateApiKey: string;
    googleClientEmail: string;
    googleTimezoneUTC: string;
    extensionSeconds: number;
}

export default (secrets: AwsSecrets): AuctionConfig => {
    return buildConfig<AuctionConfig>({
        googlePrivateApiKey: secrets.GOOGLE_PRIVATE_API_KEY,
        googleClientEmail: secrets.GOOGLE_CLIENT_EMAIL,
        googleTimezoneUTC: process.env.GOOGLE_TIMEZONE || "UTC+1",
        extensionSeconds: 5 * 60,
    });
};
