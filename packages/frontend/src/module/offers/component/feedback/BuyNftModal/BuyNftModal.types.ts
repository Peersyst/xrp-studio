import { NftDto, OfferDto } from "module/api/service";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";

export enum BuyNftModalType {
    BUY = "buy",
    ACCEPT_TRANSFER = "accept-transfer",
}

export interface BuyNftModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    offer: OfferDto;
    type: BuyNftModalType;
}
