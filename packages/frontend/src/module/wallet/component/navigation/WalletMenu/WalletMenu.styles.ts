import { Divider } from "@peersyst/react-components";
import Link from "module/common/component/navigation/Link/Link";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const CardRoot = styled(Card)(
    ({ theme }) => css`
        border-radius: 8px;
        padding: 1rem 0rem;
        .Content {
            padding: 0rem 1.25rem;
        }
        background: ${theme.palette.mode === "light" ? theme.palette.background : theme.palette.black["85"]};
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
