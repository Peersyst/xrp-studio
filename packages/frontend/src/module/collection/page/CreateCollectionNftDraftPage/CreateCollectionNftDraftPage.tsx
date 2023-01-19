import { useNavigate, useParams } from "react-router-dom";
import useCreateCollectionState from "module/collection/page/CreateCollectionPage/hook/useCreateCollectionState";
import { useEffect, useMemo } from "react";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import CollectionCreationNftDraftPageScaffold from "module/collection/component/layout/CollectionCreationNftDraftPageScaffold/CollectionCreationNftDraftPageScaffold";
import { CreateCollectionNftRequest } from "module/api/service";

const CreateCollectionNftDraftPage = (): JSX.Element => {
    const navigate = useNavigate();

    const { draftId: draftIdParam } = useParams();
    const draftId = draftIdParam !== undefined ? Number(draftIdParam) : undefined;

    const {
        state: { nfts, name: collectionName },
        setNft,
    } = useCreateCollectionState();
    const draft = useMemo(() => (draftId !== undefined ? nfts[draftId] : undefined), [draftIdParam]);

    useEffect(() => {
        if (!draft) navigate(CollectionRoutes.CREATE_COLLECTION, { replace: true });
    }, [draft, draftIdParam]);

    const handleSave = async (data: CreateCollectionNftRequest): Promise<void> => setNft(draftId!, data);

    return (
        <CollectionCreationNftDraftPageScaffold
            backPath={CollectionRoutes.CREATE_COLLECTION}
            draft={draft}
            onSave={handleSave}
            collectionDrafts={nfts}
            draftLink={(_, i) => CollectionRoutes.CREATE_COLLECTION_EDIT_NFT.replace(":draftId", i.toString())}
            collectionName={collectionName}
        />
    );
};

export default CreateCollectionNftDraftPage;
