import { CollectionDto } from "module/api/service";
import { ModalRootProps } from "module/common/component/feedback/Modal/Modal.types";
import { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";

export interface DropLaunchModalProps extends ModalRootProps {
    request: CreateDropFormRequest;
    collection: CollectionDto;
}
