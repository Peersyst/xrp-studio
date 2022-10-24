import { BlockchainAddress } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const BlockchainAddressLabelRoot = styled(BlockchainAddress)<{ light?: boolean }>(
    ({ theme, light }) => css`
        background-color: transparent;
        .Typography {
            color: ${light ? theme.palette.black[60] : theme.palette.black[0]};
        }
    `,
);
