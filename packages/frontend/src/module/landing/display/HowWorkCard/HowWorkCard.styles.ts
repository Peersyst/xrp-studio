import styled, { css } from "styled-components";
import { Image, Col, Typography } from "@peersyst/react-components";

export const HowWorkCardRoot = styled(Col)`
    .Skeleton {
        min-width: 40rem;
        max-width: 40rem;
    }
    .Typography {
        overflow: initial;
    }
    width: 100%;
`;

export const BaseImage = styled(Image)(
    ({ theme }) => css`
        width: 60rem;
        ${theme.breakpoints.down("sm")} {
            width: 40rem;
        }
        ${theme.breakpoints.down("mobile")} {
            width: 23rem;
        }
    `,
);

export const BaseDescription = styled(Typography)`
    line-height: 28px;
    line-height: 145%;
    text-align: center;
`;
