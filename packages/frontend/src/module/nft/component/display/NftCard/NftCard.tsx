import { useConfig, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import NftCardStatusChip from "../NftCardStatusChip/NftCardStatusChip";
import { forwardRef } from "react";
import { cx } from "@peersyst/react-utils";

const NftCard = forwardRef(
    (
        { nft: { id, metadata: { name = "", image } = {}, status }, loading = false, className, ...rest }: WithSkeleton<NftCardProps>,
        ref,
    ): JSX.Element => {
        const defaultImgUrl = useConfig("nftDefaultImageUrl");

        return (
            <BaseCard
                ref={ref}
                title={loading ? "NFT name loading" : name}
                to={
                    status === "confirmed"
                        ? NftRoutes.VIEW_NFT.replace(":id", id.toString())
                        : status !== "pending"
                        ? `${NftRoutes.NFT_CREATION}?id=${id}`
                        : undefined
                }
                defaultCoverUrl={defaultImgUrl}
                coverUrl={image}
                loading={loading}
                status={status !== "confirmed" && <NftCardStatusChip label={status} status={status} nftId={id!} />}
                className={cx("nft-card", className)}
                {...rest}
            />
        );
    },
);

export default NftCard;
