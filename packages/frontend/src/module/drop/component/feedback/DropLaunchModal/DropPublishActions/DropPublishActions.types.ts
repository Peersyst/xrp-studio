import { ActionStepsHandlers } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import { CollectionDto, CreateDropRequest } from "module/api/service";

export type DropPublishActionsProps = Omit<ActionStepsHandlers, "onSuccess"> & {
    request: CreateDropRequest;
    collection: CollectionDto;
    onSuccess?: (path: string) => void;
};
