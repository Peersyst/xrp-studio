import { CreateOfferRequest, NftDto } from "module/api/service";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";

export type NftCreateOfferModalState = Omit<CreateOfferRequest, "nftId" | "type">;

export enum CreateNftOfferModalType {
    SELL = "sell",
    BUY = "buy",
}

export interface NftCreateOfferModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
    type: CreateNftOfferModalType;
}
