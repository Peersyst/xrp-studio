import { buildConfig } from "./util/config.utils";

interface XrpConfig {
    node: string;
    startingLedgerIndex: number;
    enableIndexer: boolean;
}

export default (): XrpConfig => {
    return buildConfig<XrpConfig>({
        node: {
            default: "wss://xrplcluster.com",
            production: "wss://xrplcluster.com",
        },
        startingLedgerIndex: {
            default: 77264094,
            production: 77264094,
        },
        enableIndexer: {
            default: true,
            production: true,
            test: false,
        },
    });
};
