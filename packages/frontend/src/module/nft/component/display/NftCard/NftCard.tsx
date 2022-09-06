import { useConfig, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import { NftImage } from "./NftCard.styles";

const NftCard = ({ nft: { id, metadata: { name = "", image } = {} }, loading = false }: WithSkeleton<NftCardProps>): JSX.Element => {
    const defaultImgUrl = useConfig("nftDefaultCoverUrl");
    return (
        <BaseCard
            title={loading ? "loading-title" : name}
            to={NftRoutes.NFTS + id}
            cover={<NftImage src={image ?? defaultImgUrl} alt={`nft-${id}-cover`} />}
            loading={loading}
        />
    );
};

export default NftCard;
