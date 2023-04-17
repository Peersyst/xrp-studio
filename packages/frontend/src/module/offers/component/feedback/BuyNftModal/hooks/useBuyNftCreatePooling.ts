import { polling } from "@peersyst/react-utils";
import { NftDto, NftService, OfferDto } from "module/api/service";
import Queries from "query/queries";
import { useQueryClient } from "react-query";

export interface BuyHandleNftBuyStatus {
    nft: NftDto;
    offerHash: OfferDto["offerHash"];
}

function hasOfferBeenAccepted(offers: OfferDto[], offerHash: string): boolean {
    return offers.some((offer) => offer.offerHash === offerHash && !offer.acceptOfferHash);
}

export default function useBuyNftCreatePooling() {
    const queryClient = useQueryClient();

    const handleStatus = ({ nft, offerHash }: BuyHandleNftBuyStatus) => {
        return hasOfferBeenAccepted(nft.offers || [], offerHash);
    };

    const handleFetch = async ({ nft, offerHash }: BuyHandleNftBuyStatus) => {
        const res = await NftService.nftControllerGetNft(nft.id);
        return {
            nft: res,
            offerHash,
        };
    };

    const startPooling = async (params: BuyHandleNftBuyStatus) => {
        await polling(() => handleFetch(params), handleStatus);
        await queryClient.invalidateQueries([Queries.NFT, params.nft.id]);
        await queryClient.invalidateQueries([Queries.MY_NFTS]);
        await queryClient.invalidateQueries([Queries.NFTS]);
    };

    return {
        startPooling,
    };
}
