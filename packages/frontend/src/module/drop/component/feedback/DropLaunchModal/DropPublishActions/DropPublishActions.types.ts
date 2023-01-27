import { ActionStepsHandlers } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import { CollectionDto } from "module/api/service";
import { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";

export type DropPublishActionsProps = Omit<ActionStepsHandlers, "onSuccess"> & {
    request: CreateDropFormRequest;
    collection: CollectionDto;
    onSuccess?: (id: number) => void;
};
