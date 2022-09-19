import { Col } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import PageHeader from "../PageHeader/PageHeader";

export const MainPageHeaderRoot = styled(PageHeader)(
    ({ theme }) => css`
        .main-header {
            border-bottom: 1px solid ${theme.palette.black[80]};
        }
    `,
);

export const MainPageHeaderWrapper = styled(Col)(
    ({ theme }) => css`
        max-width: var(--page-max-width);
        margin: 0 auto;
        ${theme.breakpoints.down("mobile")} {
            row-gap: 1.5rem;
        }
    `,
);
