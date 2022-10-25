import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const WalletCardRoot = styled(Card)(
    ({ theme }) => css`
        width: 100%;
        padding: 0.5rem;
        background-color: ${theme.palette.black[80]};
    `,
);
