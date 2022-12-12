import styled, { css } from "styled-components";
import { Image, Typography } from "@peersyst/react-components";

export const BannerImage = styled(Image)(
    ({ theme }) => css`
        width: 20rem;
        ${theme.breakpoints.down("mobile")} {
            width: 15rem;
        }
    `,
);

export const BannerTypography = styled(Typography)(
    ({ theme }) => css`
        ${theme.breakpoints.down("mobile")} {
            text-align: center;
        }
    `,
);
