import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Form, useModal, useToast } from "@peersyst/react-components";
import CollectionCreationPageHeader from "module/collection/page/CollectionCreationPage/CollectionCreationPageHeader/CollectionCreationPageHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetCollection from "module/collection/query/useGetCollection";
import useWallet from "module/wallet/hook//useWallet";
import { useEffect, useState } from "react";
import useTranslate from "module/common/hook/useTranslate";
import CollectionCreationPageContent from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent";
import useCreateCollection from "module/collection/query/useCreateCollection";
import useUpdateCollection from "module/collection/query/useUpdateCollection";
import { CollectionCreationForm } from "module/collection/types";
import createCollectionRequestFromForm from "module/collection/util/createCollectionRequestFromForm";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import CollectionPublishModal from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal";
import { useResetRecoilState } from "recoil";
import collectionCreationState from "module/collection/state/CollectionCreationState";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import { DropRoutes } from "module/drop/DropRouter";

const CollectionCreationPage = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const { showModal } = useModal();
    const navigate = useNavigate();
    const resetCollectionCreationState = useResetRecoilState(collectionCreationState);

    const [searchParams, setSearchParams] = useSearchParams();
    const collectionId = searchParams.get("id");
    const { data: collection, isLoading: collectionLoading } = useGetCollection(collectionId ? Number(collectionId) : undefined);

    const { mutateAsync: createCollection, isLoading: publishing } = useCreateCollection();
    const { mutateAsync: updateCollection, isLoading: saving } = useUpdateCollection();
    const [creating, setCreating] = useState<boolean>();
    const { address: userAddress } = useWallet();
    const [{ name, image, header, description }, setCollectionCreationState] = useCollectionCreationState();

    useEffect(() => {
        setCollectionCreationState({
            id: collection?.id,
            name: name || collection?.name,
            description: description || collection?.description,
            header: header || collection?.header,
            image: image || collection?.image,
        });
    }, [collection]);

    useEffect(() => {
        if (collection && collection.account !== userAddress) {
            showToast(translateError("collectionNotOwned"), { type: "warning" });
            searchParams.delete("id");
            setSearchParams(searchParams);
        } else if (collectionId !== null && !collectionLoading && !collection) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }, [collectionId, collectionLoading, collection, userAddress]);

    const handleSubmit = async (data: CollectionCreationForm, action?: string) => {
        if (collection) {
            if (action === "publish") {
                showModal(CollectionPublishModal, { request: createCollectionRequestFromForm("update", data), collection });
            } else {
                await updateCollection({
                    id: collection.id,
                    collection: createCollectionRequestFromForm("update", data),
                });
                resetCollectionCreationState();
                showToast(translate("collectionUpdated"), { type: "success" });
                if (action === "launch") {
                    navigate(DropRoutes.DROP_CREATION + "?id=" + collection.id);
                } else {
                    navigate(CollectionRoutes.MY_COLLECTIONS, { replace: true });
                }
            }
        } else {
            if (action === "publish") {
                showModal(CollectionPublishModal, { request: createCollectionRequestFromForm("create", data) });
            } else {
                setCreating(true);
                const collectionData = await createCollection({
                    collection: createCollectionRequestFromForm("create", data),
                    publish: false,
                });

                resetCollectionCreationState();
                setCreating(false);
                showToast(translate("collectionCreated"), { type: "success" });

                if (action === "launch") {
                    navigate(DropRoutes.DROP_CREATION + "?id=" + collectionData.id);
                } else {
                    navigate(CollectionRoutes.MY_COLLECTIONS, { replace: true });
                }
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BasePage>
                {{
                    header: (
                        <CollectionCreationPageHeader
                            collection={collection}
                            loading={collectionLoading}
                            publishing={publishing}
                            saving={saving}
                            creating={creating}
                        />
                    ),
                    content: <CollectionCreationPageContent collection={collection} loading={collectionLoading} />,
                }}
            </BasePage>
        </Form>
    );
};

export default CollectionCreationPage;
