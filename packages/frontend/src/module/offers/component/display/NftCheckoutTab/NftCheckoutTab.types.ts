import { NftDto } from "module/api/service";
import { BuyNftModalType } from "../../feedback/BuyNftModal/BuyNftModal.types";

export interface NftCheckoutTabProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    amount: string;
    fee?: string;
    type: BuyNftModalType;
}
