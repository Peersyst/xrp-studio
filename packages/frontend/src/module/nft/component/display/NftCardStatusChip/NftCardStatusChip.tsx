import { Popover, Typography, WithSkeleton, Skeleton } from "@peersyst/react-components";
import { NftCardChip, NftStatusChipPopoverCard, NftStatusChipRoot } from "../NftCardStatusChip/NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "../NftCardStatusChip/NftCardStatusChip.types";
import useTranslate from "module/common/hook/useTranslate";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { SyntheticEvent, useState } from "react";
import { cx } from "@peersyst/react-utils";

const NftStatusChip = ({ label, status, nftId }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { mutate: updateNftDraft, isLoading: isLoading } = useUpdateNftDraft();
    const [labelChip, setLabelChip] = useState(label);

    const handleMouseEnter = () => {
        setLabelChip(status === "failed" ? translate("publish") : label);
    };

    const handleMouseLeave = () => {
        setLabelChip(label);
    };

    const handleClick = (e: SyntheticEvent): void => {
        e.preventDefault();
        updateNftDraft({ id: nftId, publish: true });
    };

    return (
        <NftStatusChipRoot position="top" arrow visible={status === "failed" ? undefined : false}>
            <Popover.Popper>
                <NftStatusChipPopoverCard>
                    <Typography variant="body1">{translateError("nftFailed")}</Typography>
                </NftStatusChipPopoverCard>
            </Popover.Popper>
            <Popover.Content>
                <Skeleton loading={isLoading} className="skeleton-chip">
                    <NftCardChip
                        className={cx("nft-card-chip", status)}
                        label={labelChip}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => handleClick(e)}
                    />
                </Skeleton>
            </Popover.Content>
        </NftStatusChipRoot>
    );
};

export default NftStatusChip;
