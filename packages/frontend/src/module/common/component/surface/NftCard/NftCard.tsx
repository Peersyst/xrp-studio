import { Chip, withSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import BaseCard from "module/common/component/surface/BaseCard/BaseCard";
import { NftImage } from "module/common/component/surface/NftCard/NftCard.styles";

const NftCard = ({ title, note, loading, image, to }: NftCardProps): JSX.Element => {
    return (
        <BaseCard title={title} to={to} cover={<NftImage src={image} alt={"nft"} />} loading={loading}>
            {note && <Chip label={note} />}
        </BaseCard>
    );
};

export default withSkeleton(NftCard);
