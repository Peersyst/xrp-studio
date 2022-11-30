import { ActionStepsHandlers } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import { CreateCollectionRequest } from "module/api/service";

export type CollectionPublishActionsProps = Omit<ActionStepsHandlers, "onSuccess"> & {
    request: CreateCollectionRequest;
    onSuccess?: (id: number) => void;
};