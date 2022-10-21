import { buildConfig } from "./util/config.utils";

interface BullConfig {
    age: number;
    count: number;
}

export default (): BullConfig => {
    return buildConfig<BullConfig>({
        age: 3600,
        count: 100,
    });
};
