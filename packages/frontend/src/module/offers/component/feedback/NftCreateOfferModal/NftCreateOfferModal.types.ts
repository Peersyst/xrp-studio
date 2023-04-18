import { CreateOfferRequest, NftDto } from "module/api/service";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";

export type NftCreateOfferModalState = Omit<CreateOfferRequest, "nftId" | "type">;

export enum CreateNftOfferModalType {
    SELL = "sell",
    BUY = "buy",
    TRANSFER = "transfer", //Transfer is a sell with price 0
}

export interface NftCreateOfferModalProps extends Omit<TabsModalProps<NftCreateOfferModalState>, "children" | "tabs"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    type: CreateNftOfferModalType;
}
