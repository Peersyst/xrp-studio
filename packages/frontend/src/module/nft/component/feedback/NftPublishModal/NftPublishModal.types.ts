import { CreateNftDraftRequest } from "module/api/service";
import { ModalProps } from "module/common/component/feedback/Modal/Modal.types";

export interface NftPublishModalProps extends ModalProps {
    request: CreateNftDraftRequest;
    draftId?: number;
    collection?: string;
}
