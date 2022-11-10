import { useConfig, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import NftCardStatusChip from "../NftCardStatusChip/NftCardStatusChip";

const NftCard = ({
    nft: { id, metadata: { name = "", image } = {}, status },
    loading = false,
}: WithSkeleton<NftCardProps>): JSX.Element => {
    const defaultImgUrl = useConfig("nftDefaultCoverUrl");

    return (
        <BaseCard
            title={loading ? "loading-title" : name}
            to={status === "confirmed" ? NftRoutes.VIEW_NFT.replace(":id", id.toString()) : `${NftRoutes.NFT_CREATION}?id=${id}`}
            defaultUrl={defaultImgUrl}
            coverUrl={image}
            loading={loading}
            status={status !== "confirmed" && <NftCardStatusChip label={status} status={status} id={String(id)} />}
        />
    );
};

export default NftCard;
