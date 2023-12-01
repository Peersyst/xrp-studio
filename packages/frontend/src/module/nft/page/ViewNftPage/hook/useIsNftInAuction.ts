import config from "config/config";

export default function (id: number): boolean {
    let isNftInAuction = false;
    const idsNftAuction = config.auction.nftsInAuction;
    const auction = idsNftAuction.find((auction) => auction.id === id);

    if (auction) {
        const startDate = new Date(auction?.startDate);
        if (startDate < new Date()) {
            isNftInAuction = true;
        }
    }

    return isNftInAuction;
}
