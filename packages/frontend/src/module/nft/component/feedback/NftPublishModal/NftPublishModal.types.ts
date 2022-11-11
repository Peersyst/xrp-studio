import { NftCreationForm } from "module/nft/types";
import { NftDraftDto } from "module/api/service";
import { CommonModalComponentProps } from "@peersyst/react-components";

export interface NftPublishModalProps extends CommonModalComponentProps {
    data: NftCreationForm;
    action?: string;
    nftDraft?: NftDraftDto;
}
