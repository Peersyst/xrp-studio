import styled, { css } from "styled-components";
import { Col, Drawer } from "@peersyst/react-components";

export const HeaderMenuRoot = styled(Drawer)(
    ({ theme }) => css`
        padding: 0 0 20px;
        background-color: ${theme.palette.background};
        ${(p) => p.theme.breakpoints.up("mobile")} {
            display: none;
        }
    `,
);

export const HeaderMenuLinksWrapper = styled(Col)`
    align-items: center;
    row-gap: 20px;
`;
