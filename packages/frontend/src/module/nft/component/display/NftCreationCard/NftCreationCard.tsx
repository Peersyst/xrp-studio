import { NftCreationCardProps } from "module/nft/component/display/NftCreationCard/NftCreationCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { config } from "config";

const NftCreationCard = ({ nft: { metadata: { name = "", image } = {} }, ...rest }: NftCreationCardProps): JSX.Element => (
    <BaseCard title={name} coverUrl={image} defaultCoverUrl={config.nftDefaultCoverUrl} {...rest} />
);

export default NftCreationCard;
