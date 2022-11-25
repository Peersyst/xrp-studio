import { DropDto } from "module/api/service";
import { Faq } from "module/drop/types";
import { ModalRootProps } from "module/common/component/feedback/Modal/Modal.types";

export interface DropLaunchModalProps extends ModalRootProps {
    // TODO: Add CreateDropRequest
    request: Omit<DropDto, "faqs" | "id"> & { faqs: Array<Faq> };
    collectionId: number;
}
