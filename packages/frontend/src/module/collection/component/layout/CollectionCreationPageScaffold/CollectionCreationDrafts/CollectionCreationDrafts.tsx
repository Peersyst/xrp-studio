import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import { Col, Grid, Skeleton, useFormNotification, useFormValidity, useTheme } from "@peersyst/react-components";
import NftCreationCard from "module/nft/component/display/NftCreationCard/NftCreationCard";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { CollectionCreationFormFields } from "module/collection/types";
import useTranslate from "module/common/hook/useTranslate";
import { CollectionCreationDraftsProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/CollectionCreationDrafts.types";
import useAddCollectionDrafts from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/hook/useAddCollectionDrafts";
import useRemoveCollectionDraft from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationDrafts/hook/useRemoveCollectionDraft";

const CollectionCreationDrafts = ({
    loading = false,
    totalNfts,
    drafts = [],
    draftLink,
    onDraftsAdded,
    onDraftRemoved,
    name,
    description,
    transferFee,
    externalUrl,
    backgroundColor,
    burnable,
    onlyXRP,
    transferable,
    attributes,
}: CollectionCreationDraftsProps): JSX.Element => {
    const {
        breakpoints: {
            values: { createCollectionNftGrid },
        },
    } = useTheme();
    const translate = useTranslate();

    const { draftsUploading, handleDraftsUpload, handleAddDrafts } = useAddCollectionDrafts({
        onDraftsAdded,
        totalNfts,
        name,
        description,
        transferFee,
        backgroundColor,
        externalUrl,
        burnable,
        onlyXRP,
        transferable,
        attributes,
    });
    const { removing, handleRemoveDraft } = useRemoveCollectionDraft(onDraftRemoved);

    const collectionFormIsValid = useFormValidity();
    useFormNotification(CollectionCreationFormFields.NFTS, drafts, !draftsUploading);

    const nftCards = drafts.map((nft, index) => (
        <NftCreationCard key={index} nft={nft} deleting={removing} onDeleteClicked={() => handleRemoveDraft(nft.id)} to={draftLink(nft)} />
    ));

    return (
        <Col flex={1} gap="3.5rem">
            {(!!draftsUploading || !!nftCards.length) && (
                <Grid
                    cols={2}
                    colGap="1.5rem"
                    rowGap="1.5rem"
                    justifyItems="stretch"
                    breakpoints={[{ maxWidth: createCollectionNftGrid, cols: 1 }]}
                >
                    {!!draftsUploading && <BaseCardSkeletons count={draftsUploading} />}
                    {nftCards}
                </Grid>
            )}
            <Skeleton loading={loading} width="100%" style={{ aspectRatio: "1" }}>
                <ImageInput
                    alt="nfts"
                    css={{ aspectRatio: "1.3" }}
                    value={undefined}
                    multiple
                    placeholder={{
                        text: translate("uploadAFileToCreateAnNfts"),
                    }}
                    onUpload={handleDraftsUpload}
                    onChange={handleAddDrafts}
                    disabled={!collectionFormIsValid}
                />
            </Skeleton>
        </Col>
    );
};

export default CollectionCreationDrafts;
