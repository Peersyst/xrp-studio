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
            default: 77265201,
            production: 77265201,
        },
        enableIndexer: {
            default: true,
            production: true,
            test: false,
        },
    });
};
