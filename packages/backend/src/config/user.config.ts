import { buildConfig } from "./util/config.utils";

interface UserConfig {
    isVerified: boolean;
}

export default function (): UserConfig {
    return buildConfig<UserConfig>({
        isVerified: {
            default: true,
            production: false,
        },
    });
}
