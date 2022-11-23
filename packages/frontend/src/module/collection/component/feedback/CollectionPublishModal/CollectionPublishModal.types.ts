import { ModalRootProps } from "module/common/component/feedback/Modal/Modal.types";
import { CreateCollectionRequest } from "module/api/service";

export interface CollectionPublishModalProps extends ModalRootProps {
    request: CreateCollectionRequest;
}
