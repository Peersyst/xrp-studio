import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const QrCard = styled(Card)(
    ({ theme }) => css`
        border-radius: ${theme.borderRadius};
        padding: 3rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
);
