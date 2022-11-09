import { Chip } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { NftStatus } from "./NftCardStatusChip.types";

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
