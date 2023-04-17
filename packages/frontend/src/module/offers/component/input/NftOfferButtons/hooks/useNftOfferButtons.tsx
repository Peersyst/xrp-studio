import { NftDto, OfferDto } from "module/api/service";
import useWallet from "module/wallet/hook/useWallet";
import { useMemo } from "react";

export interface UseNftOfferButtonsReturn {
    isOwner: boolean;
    canTransfer: boolean;
    canAccept: boolean;
    acceptableOffer?: OfferDto;
    hasAddress?: boolean;
}

export interface UseNftOfferButtonsParams {
    nft: NftDto;
}

function isOfferAcceptable({ destination, acceptOfferHash, expiration }: OfferDto, walletAddress: string): boolean {
    const now = new Date().getTime();
    const isAllowedAddress = !!destination && destination === walletAddress;
    const isNotAccepted = !acceptOfferHash;
    const isNotExpired = typeof expiration === "number" ? now > expiration : true;
    return isAllowedAddress && isNotAccepted && isNotExpired;
}

export default function useNftOfferButtons({ nft }: UseNftOfferButtonsParams): UseNftOfferButtonsReturn {
    const { user: { address: nftOwnerAddress } = {}, offers = [] } = nft;
    const { address: walletAddress = "" } = useWallet();

    const isOwner = walletAddress === nftOwnerAddress;
    const hasOffers = offers?.length > 0;

    //Only can accept offers that are to the user and have not been accepted yet
    const acceptableOffer = useMemo(() => {
        return offers?.find((offer) => isOfferAcceptable(offer, walletAddress));
    }, [offers, walletAddress]);
    const canAccept = !!acceptableOffer;

    return {
        isOwner,
        canTransfer: !hasOffers,
        canAccept,
        acceptableOffer,
        hasAddress: !!walletAddress,
    };
}
