import { Popover, Typography, WithSkeleton, useModal } from "@peersyst/react-components";
import { NftCardChip, NftStatusChipPopoverCard, NftStatusChipRoot } from "../NftCardStatusChip/NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "../NftCardStatusChip/NftCardStatusChip.types";
import useTranslate from "module/common/hook/useTranslate";
import { SyntheticEvent, useState } from "react";
import { cx } from "@peersyst/react-utils";
import NftPublishModal from "../../feedback/NftPublishModal/NftPublishModal";
import createNftRequestFromNft from "module/nft/util/createNftRequestFromNft";
import { useGetMyCollections } from "module/collection/query/useGetMyCollections";
import { usePaginatedList } from "@peersyst/react-hooks";

const NftStatusChip = ({ nft }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const translateError = useTranslate("error");
    const [labelChip, setLabelChip] = useState(nft.status);
    const { data: { pages = [] } = {} } = useGetMyCollections();
    const collections = usePaginatedList(pages, (page) => page.items);

    const handleMouseEnter = () => {
        setLabelChip(nft.status === "failed" ? translate("publish") : nft.status);
    };

    const handleMouseLeave = () => {
        setLabelChip(nft.status);
    };

    const handleClick = (e: SyntheticEvent): void => {
        e.preventDefault();

        const requestNft = createNftRequestFromNft(nft);
        const collection = collections.find((el) => el.taxon === requestNft.taxon);
        showModal(NftPublishModal, { request: requestNft, collection: collection?.name, draftId: nft?.id });
    };

    return (
        <NftStatusChipRoot position="top" arrow visible={nft.status === "failed" ? undefined : false}>
            <Popover.Popper>
                <NftStatusChipPopoverCard>
                    <Typography variant="body1">{translateError("nftFailed")}</Typography>
                </NftStatusChipPopoverCard>
            </Popover.Popper>
            <Popover.Content>
                <NftCardChip
                    className={cx("nft-card-chip", nft.status)}
                    label={labelChip}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={nft.status === "failed" ? (e) => handleClick(e) : undefined}
                />
            </Popover.Content>
        </NftStatusChipRoot>
    );
};

export default NftStatusChip;
