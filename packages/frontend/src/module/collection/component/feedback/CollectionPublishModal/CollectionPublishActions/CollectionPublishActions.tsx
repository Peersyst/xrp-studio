import useTranslate from "module/common/hook/useTranslate";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useCreateCollection from "module/collection/query/useCreateCollection";
import { CollectionPublishActionsProps } from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishActions/CollectionPublishActions.types";
import useCollectionNftsStatus from "module/collection/hook/useCollectionNftsStatus";

// TODO: Mocked id as create collection does not return ids
const collectionNftIdsMock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CollectionPublishActions = ({ onStart, onSuccess, onEnd, onError, request }: CollectionPublishActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: publish, data } = useCreateCollection();
    const { fetch: fetchCollectionNftsStatus, pendingIds, failedIds } = useCollectionNftsStatus(collectionNftIdsMock);

    const handleSuccess = () => {
        onSuccess?.(data!.id);
    };

    const steps: Step[] = [
        {
            title: translate("collectionCreationStepTitle"),
            description: translate("collectionCreationStepText"),
            execution: async () => await publish({ collection: request, publish: true }),
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
