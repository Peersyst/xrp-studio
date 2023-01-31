import { DialogProps } from "@peersyst/react-components";
import { CollectionDto } from "module/api/service";
import { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";

export interface DropLaunchInformationDialogProps extends Omit<DialogProps, "title" | "content" | "buttons"> {
    request: CreateDropFormRequest | undefined;
    collection: CollectionDto | undefined;
}
