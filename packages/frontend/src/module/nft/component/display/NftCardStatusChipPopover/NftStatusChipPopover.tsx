import { Popover, Col, Row, Typography, WithSkeleton } from "@peersyst/react-components";
import { NftCardChip } from "../NftCardStatusChip/NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "../NftCardStatusChip/NftCardStatusChip.types";
import { PopoverCard, PopoverRoot } from "./NftStatusChipPopover.styles";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";
import useUpdateNftDraft from "module/nft/query/useUpdateNftDraft";
import { useState } from "react";

const NftStatusChipPopover = ({ label, status, id }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const navigate = useNavigate();
    const { mutate: updateNftDraft, isLoading: updateNftDraftLoading } = useUpdateNftDraft();
    const [labelChip, setLabelChip] = useState(label);

    const onMouseEnterHandler = () => {
        setLabelChip(status === "failed" ? translate("publish") : label);
    };

    const onMouseLeaveHandler = () => {
        setLabelChip(label);
    };

    return (
        <PopoverRoot position="top" arrow>
            <Popover.Popper>
                <PopoverCard>
                    <Col gap={15}>
                        <Typography variant="body1">{translateError("nftFailed")}</Typography>
                        {/*
                        <Row gap={10}>
                            <Button
                                size="sm"
                                onClick={() => {
                                    updateNftDraft({ id: Number(id), publish: true });
                                }}
                            >
                                {translate("publish")}
                            </Button>
                            <Button
                                variant="outlined"
                                size="sm"
                                onClick={() => {
                                    navigate(NftRoutes.VIEW_NFT.replace(":id", id.toString()));
                                }}
                            >
                                {translate("viewNft")}
                            </Button>
                        </Row>
                        */}
                    </Col>
                </PopoverCard>
            </Popover.Popper>
            <Popover.Content>
                <NftCardChip
                    label={labelChip}
                    status={status}
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                    onClick={() => {
                        updateNftDraft({ id: Number(id), publish: true });
                    }}
                />
            </Popover.Content>
        </PopoverRoot>
    );
};

export default NftStatusChipPopover;
