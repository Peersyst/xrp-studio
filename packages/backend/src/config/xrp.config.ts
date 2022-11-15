import { buildConfig } from "./util/config.utils";

interface XrpConfig {
    node: string;
    startingLedgerIndex: number;
}

export default (): XrpConfig => {
    return buildConfig<XrpConfig>({
        node: {
            default: "wss://s.altnet.rippletest.net/",
            production: "wss://xrplcluster.com",
        },
        startingLedgerIndex: {
            default: 4217150,
            production: 75184704,
        },
    });
};
