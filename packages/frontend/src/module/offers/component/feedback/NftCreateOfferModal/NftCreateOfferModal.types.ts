import { NftDto } from "module/api/service";
import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";
import { MakeNftOfferRequest } from "module/offers/query/useMakeNftOffer";

export type NftCreateOfferModalState = Omit<MakeNftOfferRequest, "nftId">;

export interface NftCreateOfferModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}
