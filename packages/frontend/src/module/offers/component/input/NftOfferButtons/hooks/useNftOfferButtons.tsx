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

function isOfferForWalletAddress(offer: OfferDto, walletAddress: string): boolean {
    const destination = offer.destination;
    return !!destination && destination === walletAddress;
}

function isOfferAvailable({ expiration, acceptOfferHash }: OfferDto): boolean {
    const now = new Date().getTime();
    const isNotExpired = typeof expiration === "number" ? now > expiration : true;
    const isNotAccepted = !acceptOfferHash;
    return isNotExpired && isNotAccepted;
}

export default function useNftOfferButtons({ nft }: UseNftOfferButtonsParams): UseNftOfferButtonsReturn {
    const { ownerAccount, offers = [] } = nft;
    const { address: walletAddress = "" } = useWallet();

    const isOwner = walletAddress === ownerAccount;

    //Has offers availables
    const availableOffers = useMemo(() => {
        return offers?.filter((offer) => isOfferAvailable(offer));
    }, [offers]);
    const hasAvailableOffers = availableOffers.length > 0;

    //Only can accept offers that are to the user and have not been accepted yet
    const acceptableOffer = useMemo(() => {
        return hasAvailableOffers ? availableOffers?.find((offer) => isOfferForWalletAddress(offer, walletAddress)) : undefined;
    }, [availableOffers, hasAvailableOffers, walletAddress]);
    const canAccept = !!acceptableOffer;

    const canTransfer = isOwner && !hasAvailableOffers;

    return {
        isOwner,
        canTransfer,
        canAccept,
        acceptableOffer,
        hasAddress: !!walletAddress,
    };
}
