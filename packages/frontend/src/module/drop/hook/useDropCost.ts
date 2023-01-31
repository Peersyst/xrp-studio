import { useConfig } from "@peersyst/react-components";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { useMemo } from "react";
import { dropsToXrp } from "xrpl";

export default function (items: number): string {
    const dropNftMintCost = useConfig("dropNftMintCost");
    const formatNumber = useFormatNumber();

    const cost = useMemo(() => dropsToXrp((BigInt(dropNftMintCost) * BigInt(items)).toString()), [items]);

    return formatNumber(cost).toString();
}
