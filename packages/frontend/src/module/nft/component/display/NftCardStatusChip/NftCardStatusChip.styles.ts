import { Chip } from "@peersyst/react-components";
import { NftStatus } from "./NftCardStatusChip.types";
import { Popover } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

const draftStyles = css(({ theme }) => ({
    backgroundColor: theme.palette.status.info,
}));

const pendingStyles = css(({ theme }) => ({
    backgroundColor: theme.palette.status.warning,
}));

const failedStyles = css(({ theme }) => ({
    backgroundColor: `${theme.palette.status.error} !important`,
    color: `${theme.palette.black[100]} !important`,
}));

const confirmedStyles = css(() => ({
    display: "none",
}));

const variantStyles: Record<NftStatus, ReturnType<typeof css>> = {
    draft: draftStyles,
    pending: pendingStyles,
    failed: failedStyles,
    confirmed: confirmedStyles,
};

export const NftCardChip = styled(Chip)<{ status: NftStatus }>(
    ({ status }) => css`
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        text-transform: capitalize;
        ${variantStyles[status!]};
    `,
);

export const NftStatusChipRoot = styled(Popover)(
    () => css`
        position: absolute;
        left: 0.5rem;
        top: 0.2rem;
    `,
);

export const NftStatusChipPopoverCard = styled(Card)(
    () => css`
        padding: 0.5rem;
    `,
);
