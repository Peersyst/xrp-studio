import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import { Col, Grid, Skeleton, useFormNotification, useFormValidity, useTheme } from "@peersyst/react-components";
import useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import NftCreationCard from "module/nft/component/display/NftCreationCard/NftCreationCard";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { useState } from "react";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { CollectionCreationNftsProps } from "module/collection/page/CollectionCreationPage/CollectionCreationNfts/CollectionCreationNfts.types";
import { CollectionCreationFormFields } from "module/collection/types";
import useTranslate from "module/common/hook/useTranslate";
import NftCard from "module/nft/component/display/NftCard/NftCard";

const CollectionCreationNfts = ({
    loading,
    name: formName = CollectionCreationFormFields.NFTS,
    collection,
}: CollectionCreationNftsProps): JSX.Element => {
    const {
        breakpoints: {
            values: { createCollectionNftGrid },
        },
    } = useTheme();
    const translate = useTranslate();

    const [nftsUploading, setNftsUploading] = useState(0);
    const [
        { issuer, transferFee, burnable, onlyXRP, transferable, name, description, backgroundColor, externalUrl, attributes, nfts = [] },
        setCollectionCreationState,
    ] = useCollectionCreationState();

    const collectionFormIsValid = useFormValidity();
    useFormNotification(formName, nfts, !nftsUploading);

    const handleNftsUpload = (quantity: number) => {
        setNftsUploading(quantity);
    };

    const handleNftsUploaded = (nftUrls: string[] | undefined = []) => {
        setNftsUploading(0);

        const initialIndex = nfts.length + (collection?.nfts?.length || 0);
        setCollectionCreationState({
            nfts: [
                ...nfts,
                ...nftUrls?.map((url, i) => {
                    const index = i + initialIndex;
                    return {
                        id: index,
                        issuer,
                        transferFee: transferFee !== undefined ? Number(transferFee) : undefined,
                        flags: {
                            burnable,
                            onlyXRP,
                            trustLine: false,
                            transferable,
                        },
                        metadata: {
                            name: `${name} #${index + 1}`,
                            description,
                            backgroundColor: backgroundColor?.hex(),
                            externalUrl,
                            attributes,
                            image: url,
                        },
                    };
                }),
            ],
        });
    };

    const handleDeleteNft = (id: number) => {
        setCollectionCreationState({
            nfts: nfts.filter((nft) => nft.id !== id),
        });
    };

    const nftCards = nfts.map((nft, index) => (
        <NftCreationCard
            key={index}
            nft={nft}
            onDeleteClicked={() => handleDeleteNft(nft.id)}
            to={CollectionRoutes.EDIT_NFT_CREATE_COLLECTION.replace(":index", index.toString())}
        />
    ));

    const collectionNftCards = (collection?.nfts || []).map((nft) => <NftCard nft={nft} />);

    return (
        <Col flex={1} gap="3.5rem">
            {(!!nftsUploading || !!nftCards.length) && (
                <Grid
                    cols={2}
                    colGap="1.5rem"
                    rowGap="1.5rem"
                    justifyItems="stretch"
                    breakpoints={[{ maxWidth: createCollectionNftGrid, cols: 1 }]}
                >
                    {nftCards}
                    {!!nftsUploading && <BaseCardSkeletons count={nftsUploading} />}
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
                    onUpload={handleNftsUpload}
                    onChange={handleNftsUploaded}
                    disabled={!collectionFormIsValid}
                />
            </Skeleton>
            {!!collectionNftCards && (
                <Grid
                    cols={2}
                    colGap="1.5rem"
                    rowGap="1.5rem"
                    justifyItems="stretch"
                    breakpoints={[{ maxWidth: createCollectionNftGrid, cols: 1 }]}
                >
                    {collectionNftCards}
                </Grid>
            )}
        </Col>
    );
};

export default CollectionCreationNfts;
