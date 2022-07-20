import { withSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import NftCardCollection from "module/common/component/surface/NftCard/NftCardCollection";
import BaseCard from "module/common/component/surface/BaseCard/BaseCard";
import img from "../../../../../asset/image/img.png";
import { NftBackgroundImg } from "module/common/component/surface/NftCard/NftCard.styles";

const NftCard = ({ title, collection, loading }: NftCardProps): JSX.Element => {
    return (
        <BaseCard title={title} cover={<NftBackgroundImg src={img} />} loading={loading}>
            {collection && <NftCardCollection collection={collection} />}
        </BaseCard>
    );
};

export default withSkeleton(NftCard);
