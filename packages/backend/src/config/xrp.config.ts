import { buildConfig, ConfigValidators } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";
import { validXrpSecret } from "./util/config.validator";

interface XrpConfig {
    node: string;
    startingLedgerIndex: number;
    minterSecret: string;
    sellCommissionPct: number;
    dropNftMintCost: string; // Drops
}

export default (secrets: AwsSecrets = {}): XrpConfig => {
    return buildConfig<XrpConfig>(
        {
            node: {
                default: "wss://s.altnet.rippletest.net/",
                production: "wss://xrplcluster.com",
            },
            startingLedgerIndex: {
                default: 34972381,
                production: 75443457,
            },
            minterSecret: {
                production: process.env.XRP_MINTER_SECRET || secrets.XRP_MINTER_SECRET,
                default: "sEdVhyVVQL8YadiVVrizbUhbtoN8CCJ",
            },
            sellCommissionPct: {
                default: 0.05,
            },
            dropNftMintCost: {
                default: "4000000",
            },
        },
        {
            minterSecret: validXrpSecret,
            sellCommissionPct: (value: number) => value < 1 && value >= 0,
        } as ConfigValidators<XrpConfig>,
    );
};
