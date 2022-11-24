import { createModal } from "@peersyst/react-components";
import { DropLaunchModalProps } from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal.types";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import useGetCollection from "module/nft/query/useGetCollection";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { usePaginatedList } from "@peersyst/react-hooks";
import DropInformation from "module/drop/component/display/DropInformation/DropInformation";

const DropLaunchModal = createModal<DropLaunchModalProps>(({ request: { price }, collectionId, ...modalProps }): JSX.Element => {
    const translate = useTranslate();

    const { data: { header, image, name = "" } = {}, isLoading: collectionLoading } = useGetCollection(collectionId);
    const { data: infiniteNftsData, isLoading: nftsLoading } = useGetCollectionNfts(collectionId);
    const nfts = usePaginatedList(infiniteNftsData?.pages, (page) => page.items);

    return (
        <ActionModal title={translate("launchDropConfirmation")} {...modalProps}>
            {{
                cover: (
                    <DropInformation
                        header={header}
                        image={image}
                        name={name}
                        items={nfts.length}
                        price={price}
                        loading={collectionLoading}
                    />
                ),
                tabs: [
                    {
                        content: <NftsPreviewList nfts={nfts} loading={nftsLoading} />,
                        actions: [{ action: "next", disabled: collectionLoading || nftsLoading }, { action: "back" }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default DropLaunchModal;
