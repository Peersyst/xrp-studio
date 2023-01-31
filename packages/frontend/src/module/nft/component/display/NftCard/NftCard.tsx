import { useConfig, useDialog, WithSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/nft/component/display/NftCard/NftCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import NftCardStatusChip from "../NftCardStatusChip/NftCardStatusChip";
import { forwardRef } from "react";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import isDraft from "module/nft/util/isDraft";
import useDeleteNftDraft from "module/nft/query/useDeleteNftDraft";

const NftCard = forwardRef(
    ({ nft, loading = false, readonly = false, className, ...rest }: WithSkeleton<NftCardProps>, ref): JSX.Element => {
        const name = nft.metadata?.name;

        const translate = useTranslate();
        const defaultImgUrl = useConfig("nftDefaultImageUrl");

        const { showDialog, hideDialog } = useDialog();

        const { mutate: deleteNftDraft, isLoading: isDeletingNftDraft } = useDeleteNftDraft();

        const handleDelete = () => {
            showDialog({
                title: translate("deleteDraftDialogTitle"),
                content: translate("deleteDraftDialogText", { name: name || translate("unnamed") }),
                buttons: [
                    {
                        text: translate("delete"),
                        type: "destructive",
                        action: () => {
                            deleteNftDraft(nft.id);
                            hideDialog();
                        },
                    },
                    {
                        text: translate("cancel"),
                    },
                ],
            });
        };

        return (
            <BaseCard
                ref={ref}
                title={loading ? "NFT name loading" : name}
                titlePlaceholder={translate("unnamed")}
                to={
                    !readonly && nft.status === "confirmed"
                        ? NftRoutes.VIEW_NFT.replace(":id", nft.id.toString())
                        : !readonly && nft.status !== "pending"
                        ? `${NftRoutes.NFT_CREATION}?id=${nft.id}`
                        : undefined
                }
                defaultCoverUrl={defaultImgUrl}
                coverUrl={nft.metadata?.image}
                loading={loading}
                status={nft.status !== "confirmed" && <NftCardStatusChip nft={nft} />}
                className={cx("nft-card", className)}
                onDeleteClicked={isDraft(nft) ? handleDelete : undefined}
                deleting={isDeletingNftDraft}
                {...rest}
            />
        );
    },
);

export default NftCard;
