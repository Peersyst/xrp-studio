import styled, { css } from "styled-components";

export const MenuLinksRoot = styled.div(
    ({ theme }) => css`
        display: contents;

        a:hover p {
            color: ${theme.palette.black[10]};
        }
    `,
);
