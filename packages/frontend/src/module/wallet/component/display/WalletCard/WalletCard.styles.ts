import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const CardRoot = styled(Card)(
    ({ theme }) => css`
        width: 100%;
        padding: 0.5rem;
        background-color: ${theme.palette.background};
    `,
);
