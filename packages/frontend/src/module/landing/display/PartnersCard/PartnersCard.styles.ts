import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const PartnersCardRoot = styled(Card).attrs({ elevation: 4 })(
    ({ theme }) => css`
        border-radius: ${theme.borderRadius};
        padding: 1rem;
        height: 11.5rem;
        width: 22.5rem;
        display: flex;
        background: ${theme.palette.mode === "light" ? theme.palette.background : theme.palette.card};
        img {
            width: initial;
            height: initial;
            margin: auto;
        }
    `,
);
