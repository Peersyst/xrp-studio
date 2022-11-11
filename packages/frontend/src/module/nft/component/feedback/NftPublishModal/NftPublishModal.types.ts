import { CreateNftDraftRequest, NftDraftDto } from "module/api/service";
import { CommonModalComponentProps } from "@peersyst/react-components";

export interface NftPublishModalProps extends CommonModalComponentProps {
    requestNft: CreateNftDraftRequest;
    action?: string;
    nftDraft?: NftDraftDto;
}
