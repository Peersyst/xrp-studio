import { CollectionCreationForm } from "module/collection/types";
import { CollectionCreationAction } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold.types";
import CollectionPublishModal from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal";
import createCollectionRequestFromForm from "module/collection/util/createCollectionRequestFromForm";
import useTranslate from "module/common/hook/useTranslate";
import { useModal, useToast } from "@peersyst/react-components";
import { useState } from "react";
import { DropRoutes } from "module/drop/DropRouter";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import editCollectionState from "module/collection/page/EditCollectionPage/state/EditCollectionState";
import useUpdateCollection from "module/collection/query/useUpdateCollection";
import { CollectionDto } from "module/api/service";

export interface UseEditCollectionSubmitReturn {
    launching: boolean;
    saving: boolean;
    handleSubmit: (data: CollectionCreationForm, action: CollectionCreationAction) => Promise<void>;
}

export default function (collection: CollectionDto | undefined): UseEditCollectionSubmitReturn {
    const translate = useTranslate();
    const { showModal } = useModal();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const resetCollectionCreationState = useResetRecoilState(editCollectionState);

    const [editAction, setEditAction] = useState<CollectionCreationAction | undefined>(undefined);

    const { mutateAsync: updateCollection, isLoading: updating } = useUpdateCollection({ publish: false });

    const handleSubmit = async (data: CollectionCreationForm, action: CollectionCreationAction): Promise<void> => {
        if (!collection) return;

        // Remove drafts from data as they are already created
        delete data.nfts;

        setEditAction(action);

        if (action === "publish") {
            showModal(CollectionPublishModal, { request: createCollectionRequestFromForm("update", data), collection });
        } else {
            try {
                await updateCollection({
                    id: collection.id,
                    collection: createCollectionRequestFromForm("update", data),
                });
                showToast(translate("collectionUpdated"), { type: "success" });
                if (action === "launch") {
                    navigate(DropRoutes.DROP_CREATION + "?id=" + collection.id);
                } else {
                    resetCollectionCreationState();
                    navigate(CollectionRoutes.VIEW_COLLECTION.replace(":id", collection.id.toString()), { replace: true });
                }
            } catch (e) {
                // Handled by react query
            }
        }
    };

    return {
        launching: updating && editAction === "launch",
        saving: updating && editAction === "save",
        handleSubmit,
    };
}
