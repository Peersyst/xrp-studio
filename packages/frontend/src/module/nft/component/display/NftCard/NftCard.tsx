import { useConfig, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import NftCardStatusChip from "../NftCardStatusChip/NftCardStatusChip";
import { forwardRef } from "react";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";

const NftCard = forwardRef(({ nft, loading = false, className, ...rest }: WithSkeleton<NftCardProps>, ref): JSX.Element => {
    const translate = useTranslate();
    const defaultImgUrl = useConfig("nftDefaultImageUrl");

    return (
        <BaseCard
            ref={ref}
            title={loading ? "NFT name loading" : nft.metadata?.name}
            titlePlaceholder={translate("unnamed")}
            to={
                nft.status === "confirmed"
                    ? NftRoutes.VIEW_NFT.replace(":id", nft.id.toString())
                    : nft.status !== "pending"
                    ? `${NftRoutes.NFT_CREATION}?id=${nft.id}`
                    : undefined
            }
            defaultCoverUrl={defaultImgUrl}
            coverUrl={nft.metadata?.image}
            loading={loading}
            status={nft.status !== "confirmed" && <NftCardStatusChip nft={nft} />}
            className={cx("nft-card", className)}
            {...rest}
        />
    );
});

export default NftCard;
