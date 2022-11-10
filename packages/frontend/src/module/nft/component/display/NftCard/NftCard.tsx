import { useConfig, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import { NftCardChip } from "./NftCard.styles";

const NftCard = ({
    nft: { id, metadata: { name = "", image } = {}, status },
    loading = false,
}: WithSkeleton<NftCardProps>): JSX.Element => {
    const defaultImgUrl = useConfig("nftDefaultCoverUrl");
    return (
        <BaseCard
            title={loading ? "loading-title" : name}
            to={NftRoutes.VIEW_NFT.replace(":id", id.toString())}
            defaultUrl={defaultImgUrl}
            coverUrl={image}
            loading={loading}
            status={status !== "confirmed" && <NftCardChip label={status} status={status} />}
        />
    );
};

export default NftCard;
