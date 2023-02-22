import { Popover, Typography, WithSkeleton, useModal } from "@peersyst/react-components";
import { NftCardStatusChipPopoverCard } from "../NftCardStatusChip/NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "../NftCardStatusChip/NftCardStatusChip.types";
import useTranslate from "module/common/hook/useTranslate";
import { SyntheticEvent, useState } from "react";
import NftPublishModal from "../../feedback/NftPublishModal/NftPublishModal";
import createNftRequestFromNft from "module/nft/util/createNftRequestFromNft";
import NftStatusChip from "module/nft/component/display/NftStatusChip/NftStatusChip";

const NftCardStatusChip = ({ nft }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const translateError = useTranslate("error");

    const [chipLabel, setChipLabel] = useState<string | undefined>(nft.status);

    const handleMouseEnter = () => {
        if (nft.status === "failed") setChipLabel(translate("publish"));
    };

    const handleMouseLeave = () => {
        if (nft.status === "failed") setChipLabel(undefined);
    };

    const handleClick = (e: SyntheticEvent): void => {
        e.preventDefault();

        const requestNft = createNftRequestFromNft(nft);
        showModal(NftPublishModal, { request: requestNft, collection: nft.collection?.name, draftId: nft?.id });
    };

    const chip = (
        <NftStatusChip
            status={nft.status}
            label={chipLabel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={nft.status === "failed" ? (e) => handleClick(e) : undefined}
        />
    );

    return nft.status === "failed" ? (
        <Popover position="top" arrow>
            <Popover.Popper>
                <NftCardStatusChipPopoverCard>
                    <Typography variant="body2">{translateError("nftFailed")}</Typography>
                </NftCardStatusChipPopoverCard>
            </Popover.Popper>
            <Popover.Content>{chip}</Popover.Content>
        </Popover>
    ) : (
        chip
    );
};

export default NftCardStatusChip;
