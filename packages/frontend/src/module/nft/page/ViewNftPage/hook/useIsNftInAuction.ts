import config from "config/config";

export default function (id: number): boolean {
    const idsNftAuction = config.auction.nftsInAuction;
    return idsNftAuction.includes(String(id));
}
