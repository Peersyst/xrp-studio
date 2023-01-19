import { CollectionCreationForm } from "module/collection/types";
import { CollectionCreationAction } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold.types";
import CollectionPublishModal from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal";
import createCollectionRequestFromForm from "module/collection/util/createCollectionRequestFromForm";
import useTranslate from "module/common/hook/useTranslate";
import { useModal, useToast } from "@peersyst/react-components";
import { useState } from "react";
import useCreateCollection from "module/collection/query/useCreateCollection";
import { DropRoutes } from "module/drop/DropRouter";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import createCollectionState from "module/collection/page/CreateCollectionPage/state/CreateCollectionState";

export interface UseCreateCollectionSubmitReturn {
    launching: boolean;
    saving: boolean;
    handleSubmit: (data: CollectionCreationForm, action: CollectionCreationAction) => Promise<void>;
}

export default function (): UseCreateCollectionSubmitReturn {
    const translate = useTranslate();
    const { showModal } = useModal();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const resetCollectionCreationState = useResetRecoilState(createCollectionState);

    const [createAction, setCreateAction] = useState<CollectionCreationAction | undefined>(undefined);

    const { mutateAsync: createCollection, isLoading: creating } = useCreateCollection({ publish: false });

    const handleSubmit = async (data: CollectionCreationForm, action: CollectionCreationAction): Promise<void> => {
        setCreateAction(action);
        if (action === "publish") {
            showModal(CollectionPublishModal, { request: createCollectionRequestFromForm("create", data) });
        } else {
            try {
                const collectionData = await createCollection({
                    collection: createCollectionRequestFromForm("create", data),
                });
                showToast(translate("collectionCreated"), { type: "success" });
                if (action === "launch") {
                    navigate(DropRoutes.DROP_CREATION + "?id=" + collectionData.id);
                } else {
                    resetCollectionCreationState();
                    navigate(CollectionRoutes.VIEW_COLLECTION.replace(":id", collectionData.id.toString()), { replace: true });
                }
            } catch (e) {
                // Handled by react query
            }
        }
    };

    return {
        launching: creating && createAction === "launch",
        saving: creating && createAction === "save",
        handleSubmit,
    };
}
