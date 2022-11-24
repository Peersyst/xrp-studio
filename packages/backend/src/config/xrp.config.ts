import { buildConfig, ConfigValidators } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";
import { validXrpSecret } from "./util/config.validator";

interface XrpConfig {
    node: string;
    startingLedgerIndex: number;
    minterSecret: string;
}

export default (secrets: AwsSecrets = {}): XrpConfig => {
    return buildConfig<XrpConfig>(
        {
            node: {
                default: "wss://s.altnet.rippletest.net/",
                production: "wss://xrplcluster.com",
            },
            startingLedgerIndex: {
                default: 33128269,
                production: 75184704,
            },
            minterSecret: {
                production: process.env.XRP_MINTER_SECRET || secrets.XRP_MINTER_SECRET,
                default: "sEd7BVj2pxZUuLufNVk6j6Gdb56SbUC",
            },
        },
        {
            minterSecret: validXrpSecret,
        } as ConfigValidators<XrpConfig>,
    );
};
