import { WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftImage } from "module/common/component/surface/NftCard/NftCard.styles";

const NftCard = ({ nft: { id, metadata: { name = "", image = "" } = {} }, loading = false }: WithSkeleton<NftCardProps>): JSX.Element => {
    return <BaseCard title={name} to={"nfts/" + id} cover={<NftImage src={image} alt={`nft-${id}-cover`} />} loading={loading} />;
};

export default NftCard;
