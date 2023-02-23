import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import Link from "module/common/component/navigation/Link/Link";

export const WalletMenuRoot = styled(Card).attrs({ elevation: 4 })(
    ({ theme }) => css`
        border-radius: ${theme.borderRadius};
        padding: 1rem;
        width: 16.6rem;
        background: ${theme.palette.mode === "light" ? theme.palette.background : theme.palette.card};
    `,
);

export const WalletLink = styled(Link).attrs({ variant: "body2" })(
    ({ theme }) => css`
        color: ${theme.palette.black[50]};
    `,
);
