import config from "config/config";

export default function (id: number): boolean {
    let isNftInAuction = false;
    const idsNftAuction = config.auction.nftsInAuction;
    const auction = idsNftAuction.find((auction) => auction.id === id);

    if (auction) {
        const date = new Date(auction?.endDate);
        if (date > new Date()) {
            isNftInAuction = true;
        }
    }

    return isNftInAuction;
}
