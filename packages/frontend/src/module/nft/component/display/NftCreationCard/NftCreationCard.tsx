import { NftCreationCardProps } from "module/nft/component/display/NftCreationCard/NftCreationCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { config } from "config";

const NftCreationCard = ({ nft: { metadata: { name = "", image } = {} }, to }: NftCreationCardProps): JSX.Element => (
    <BaseCard title={name} to={to} coverUrl={image} defaultUrl={config.nftDefaultCoverUrl} />
);

export default NftCreationCard;
