import styled, { css } from "styled-components";
import PageHeader from "../PageHeader/PageHeader";

export const BasePageHeaderRoot = styled(PageHeader)(
    ({ theme }) => css`
        .Divider {
            width: 100vw;
            position: absolute;
            bottom: 0;
            left: calc((var(--page-max-width) - 100vw) / 2);
        }
        ${theme.breakpoints.down("mobile")} {
            .base-header-col {
                row-gap: 1.5rem;
            }
        }
    `,
);
