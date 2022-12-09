import styled, { css } from "styled-components";
import { BlockchainAddress } from "@peersyst/react-components";

export const ChipBlockchainAddressRoot = styled(BlockchainAddress)(
    ({ theme }) => css`
        padding: 0.5rem 0.875rem;
        background-color: ${theme.palette.black[85]};
        color: ${theme.palette.black[60]};
        font-weight: 500;
        border-radius: ${theme.borderRadius};
        ${theme.breakpoints.down("mobile")} {
            align-items: center;
            margin: auto;
        }
    `,
);
