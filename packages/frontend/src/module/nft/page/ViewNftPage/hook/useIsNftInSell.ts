import config from "config/config";

export default function (id: number): boolean | undefined {
    let isNftInSell = undefined;
    const idsNftSell = config.nftsInSell;
    if (id in idsNftSell) {
        isNftInSell = true;
    }
    return isNftInSell;
}
