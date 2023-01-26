import { EditCollectionPublishedNftsProps } from "module/collection/page/EditCollectionPage/EditCollectionPublishedNfts/EditCollectionPublishedNfts.types";
import { Col, Typography } from "@peersyst/react-components";
import MyNtfsGrid from "module/nft/component/display/MyNftsGrid/MyNtfsGrid";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import useTranslate from "module/common/hook/useTranslate";

const EditCollectionPublishedNfts = ({ collectionId, loading }: EditCollectionPublishedNftsProps): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return (
        <Col gap="1.5rem">
            <Typography variant="h3" fontWeight={800}>
                {translate("publishedNfts")}
            </Typography>
            <MyNtfsGrid
                link={false}
                loading={loading}
                collections={collectionId ? [collectionId] : undefined}
                status={"confirmed"}
                nothingToShow={<NothingToShow label={translateError("collectionHasNoPublishedNfts")} />}
            />
        </Col>
    );
};

export default EditCollectionPublishedNfts;
