import { CreateNftDraftRequest } from "module/api/service";
import { ModalRootProps } from "module/common/component/feedback/Modal/Modal.types";

export interface NftPublishModalProps extends ModalRootProps {
    request: CreateNftDraftRequest;
    draftId?: number;
    collection?: string;
}
