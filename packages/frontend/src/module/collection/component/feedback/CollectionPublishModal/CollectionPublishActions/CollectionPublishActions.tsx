import useTranslate from "module/common/hook/useTranslate";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useCreateCollection from "module/collection/query/useCreateCollection";
import { CollectionPublishActionsProps } from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishActions/CollectionPublishActions.types";
import useCollectionNftsStatus from "module/collection/hook/useCollectionNftsStatus";
import useUpdateCollection from "module/collection/query/useUpdateCollection";
import { useMemo } from "react";

const CollectionPublishActions = ({
    onStart,
    onSuccess,
    onEnd,
    onError,
    request,
    collection,
}: CollectionPublishActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: publishCreate, data: dataCreate } = useCreateCollection({ publish: true });
    const { mutateAsync: publishUpdate, data: dataUpdate } = useUpdateCollection({ publish: true });
    const { publish, data } = collection ? { publish: publishUpdate, data: dataUpdate } : { publish: publishCreate, data: dataCreate };

    const collectionIds = useMemo(() => (data?.nfts || []).map((nft) => nft.id), [data]);
    const { fetch: fetchCollectionNftsStatus, pendingIds, failedIds } = useCollectionNftsStatus(collectionIds);

    const handleSuccess = () => {
        onSuccess?.(data!.id);
    };

    const steps: Step[] = [
        {
            title: translate("collectionCreationStepTitle"),
            description: translate("collectionCreationStepText"),
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            execution: async () => await publish({ id: collection?.id!, collection: request }),
        },
        {
            title: translate("collectionNftsConfirmationStepTitle"),
            description:
                translate("collectionNftsConfirmationStepText", { pendingNFTs: pendingIds?.length }) +
                (failedIds.length ? ` ${translate("nftPublishesFailedText", { failedNfts: failedIds.length })}.` : ""),
            execution: fetchCollectionNftsStatus,
        },
        {
            title: translate("collectionCreationSuccessStepTitle"),
            description: translate("collectionCreationSuccessStepText"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onError={onError} onSuccess={handleSuccess} onEnd={onEnd} />;
};

export default CollectionPublishActions;
