import { buildConfig } from "./util/config.utils";

interface XrpConfig {
    node: string;
    startingLedgerIndex: number;
    enableIndexer: boolean;
}

export default (): XrpConfig => {
    return buildConfig<XrpConfig>({
        node: {
            default: "wss://s.altnet.rippletest.net/",
            production: "wss://xrplcluster.com",
        },
        startingLedgerIndex: {
            default: 34479000,
            production: 34479000,
        },
        enableIndexer: {
            default: true,
            production: true,
            test: false,
        },
    });
};
