import { NftCreationCardProps } from "module/nft/component/display/NftCreationCard/NftCreationCard.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { config } from "config";
import useTranslate from "module/common/hook/useTranslate";
import { useDialog } from "@peersyst/react-components";
import NftStatusChip from "module/nft/component/display/NftStatusChip/NftStatusChip";

const NftCreationCard = ({ nft: { metadata: { name = "", image } = {} }, onDeleteClicked, ...rest }: NftCreationCardProps): JSX.Element => {
    const translate = useTranslate();
    const { showDialog, hideDialog } = useDialog();

    const handleDelete = () => {
        showDialog({
            title: translate("deleteDraftDialogTitle"),
            content: translate("deleteDraftDialogText", { name: name || translate("unnamed") }),
            buttons: [
                {
                    text: translate("delete"),
                    type: "destructive",
                    action: () => {
                        onDeleteClicked!();
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
            title={name}
            coverUrl={image}
            defaultCoverUrl={config.nftDefaultImageUrl}
            onDeleteClicked={onDeleteClicked && handleDelete}
            status={<NftStatusChip status="draft" />}
            {...rest}
        />
    );
};

export default NftCreationCard;
