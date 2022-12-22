import { buildConfig, getConfigEnv } from "./util/config.utils";

interface UserConfig {
    isVerified: boolean;
}

export default function (): UserConfig {
    return buildConfig<UserConfig>({
        isVerified: getConfigEnv() !== "production",
    });
}
