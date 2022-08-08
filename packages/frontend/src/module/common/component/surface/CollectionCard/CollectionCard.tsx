import { Typography, WithSkeleton } from "@peersyst/react-components";
import { CollectionImage } from "module/common/component/surface/CollectionCard/CollectionCard.styles";
import { CollectionCardProps } from "module/common/component/surface/CollectionCard/CollectionCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import useTranslate from "module/common/hook/useTranslate";

const CollectionCard = ({ collection: { id, name = "", image = "", items }, loading }: WithSkeleton<CollectionCardProps>): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseCard title={name} to={"collections/" + id} cover={<CollectionImage src={image} alt={name} />} loading={loading}>
            <Typography variant="subtitle2" light>
                {`${Intl.NumberFormat().format(items)} ${translate("items").toUpperCase()}`}
            </Typography>
        </BaseCard>
    );
};

export default CollectionCard;
