import { Typography, withSkeleton } from "@peersyst/react-components";
import BaseCard from "module/common/component/surface/BaseCard/BaseCard";
import { CollectionImage } from "module/common/component/surface/CollectionCard/CollectionCard.styles";
import { CollectionCardProps } from "module/common/component/surface/CollectionCard/CollectionCard.types";

const CollectionCard = ({ title, totalNfts, loading, image, to }: CollectionCardProps): JSX.Element => {
    return (
        <BaseCard title={title} to={to} cover={<CollectionImage src={image} alt={"collection"} />} loading={loading}>
            <Typography variant="subtitle2" light>
                {totalNfts + " ITEMS"}
            </Typography>
        </BaseCard>
    );
};

export default withSkeleton(CollectionCard);
