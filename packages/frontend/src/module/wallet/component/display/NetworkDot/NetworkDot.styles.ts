import styled, { css } from "styled-components";
import { NetworkType } from "config/config.declarations";

export const NetworkDotRoot = styled.div<{ network: NetworkType }>(
    ({ theme, network }) => css`
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${network === "mainnet" ? theme.palette.status.success : theme.palette.status.warning};
    `,
);
