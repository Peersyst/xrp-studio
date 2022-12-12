import { CollectionDto, CreateDropRequest } from "module/api/service";
import { ModalRootProps } from "module/common/component/feedback/Modal/Modal.types";

export interface DropLaunchModalProps extends ModalRootProps {
    request: CreateDropRequest;
    collection: CollectionDto;
}
