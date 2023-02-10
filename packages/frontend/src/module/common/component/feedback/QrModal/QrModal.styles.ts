import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

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

export const QrImage = styled(Image)(
    ({ theme }) => css`
        width: 16rem;
        height: 16rem;

        ${theme.breakpoints.down("mobile")} {
            width: 10rem;
            height: 10rem;
        }
    `,
);
