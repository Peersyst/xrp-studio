import { CheckBalanceProps } from "module/wallet/types";
import { config } from "config";
import { xrpToDrops } from "xrpl";

export default function ({ xrpBalance }: CheckBalanceProps) {
    return Number(xrpToDrops(xrpBalance)) > config.feeInDrops;
}
