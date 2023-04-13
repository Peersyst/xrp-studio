import { TabsModalProps } from "module/common/component/feedback/TabsModal/TabsModal.types";

export interface NftCreateOfferModalProps extends Omit<TabsModalProps<any>, "children" | "tabs" | "title"> {
    className?: string;
    style?: React.CSSProperties;
}
