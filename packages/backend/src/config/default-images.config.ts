import { buildConfig } from "./util/config.utils";

interface DefaultImagesConfig {
    profile: string;
    header: string;
}

export default (): DefaultImagesConfig => {
    return buildConfig<DefaultImagesConfig>({
        profile: "https://i.ibb.co/bPzfKZj/default-profile-img.png",
        header: "https://i.ibb.co/CHjP5Zm/default-header-img.png",
    });
};
