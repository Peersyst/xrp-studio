import { Col, Divider } from "@peersyst/react-components";
import Link from "module/common/component/navigation/Link/Link";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const WalletMenuRoot = styled(Card).attrs({ elevation: 4 })(
    ({ theme }) => css`
        border-radius: ${theme.borderRadius};
        padding: 1rem 0;
        width: 16.6rem;
        background: ${theme.palette.mode === "light" ? theme.palette.background : theme.palette.black["85"]};
        margin-top: 0.5rem;
    `,
);

export const CardContent = styled(Col)(
    () => css`
        padding: 0rem 1rem;
    `,
);

export const BaseLink = styled(Link)(
    ({ theme }) => css`
        cursor: pointer;
        color: ${theme.palette.black[60]};
        font-size: 0.875rem;
        font-weight: 400;
        width: 100%;
    `,
);

export const BaseDivider = styled(Divider)(
    ({ theme }) => css`
        color: ${theme.palette.black[10]};
    `,
);
