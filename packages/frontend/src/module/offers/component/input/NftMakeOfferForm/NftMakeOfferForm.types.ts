import { CreateNftOfferModalType, NftCreateOfferModalState } from "../../feedback/NftCreateOfferModal/NftCreateOfferModal.types";

export enum NftMakeOfferFormDataNames {
    EXPIRATION_DAYS = "expirationDays",
    PRICE = "price",
    DESTINATION = "destination",
}
export interface MakeUserOfferFormData {
    [NftMakeOfferFormDataNames.EXPIRATION_DAYS]: number;
    [NftMakeOfferFormDataNames.PRICE]: string;
    [NftMakeOfferFormDataNames.DESTINATION]: string;
}

export interface NftMakeOfferFormProps {
    className?: string;
    style?: React.CSSProperties;
    onSumbit?: (data: NftCreateOfferModalState) => void;
    offerType: CreateNftOfferModalType;
}
