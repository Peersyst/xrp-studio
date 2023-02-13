import { ActionStepsHandlers } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import { CollectionDto, CreateCollectionRequest } from "module/api/service";

export type CollectionPublishActionsProps = Omit<ActionStepsHandlers, "onSuccess"> & {
    request: CreateCollectionRequest;
    onSuccess?: (newCollection: CollectionDto) => void;
    collection?: CollectionDto;
};
