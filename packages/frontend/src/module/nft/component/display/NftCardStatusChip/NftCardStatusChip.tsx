import { Popover, Col, Typography, WithSkeleton } from "@peersyst/react-components";
import { NftCardChip, NftStatusChipPopoverCard, NftStatusChipRoot } from "../NftCardStatusChip/NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "../NftCardStatusChip/NftCardStatusChip.types";
import useTranslate from "module/common/hook/useTranslate";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { useState } from "react";

const NftStatusChip = ({ label, status, id }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { mutate: updateNftDraft } = useUpdateNftDraft();
    const [labelChip, setLabelChip] = useState(label);

    const onMouseEnterHandler = () => {
        setLabelChip(status === "failed" ? translate("publish") : label);
    };

    const onMouseLeaveHandler = () => {
        setLabelChip(label);
    };
    return (
        <NftStatusChipRoot position="top" arrow disablePortal visible={status === "failed" ? undefined : false}>
            <Popover.Popper>
                <NftStatusChipPopoverCard>
                    <Col gap={15}>
                        <Typography variant="body1">{translateError("nftFailed")}</Typography>
                    </Col>
                </NftStatusChipPopoverCard>
            </Popover.Popper>
            <Popover.Content>
                <NftCardChip
                    label={labelChip}
                    status={status}
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                    onClick={(e) => {
                        e.preventDefault();
                        updateNftDraft({ id: Number(id), publish: true });
                    }}
                />
            </Popover.Content>
        </NftStatusChipRoot>
    );
};

export default NftStatusChip;
