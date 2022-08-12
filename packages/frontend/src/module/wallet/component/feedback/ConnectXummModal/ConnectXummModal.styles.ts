import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const QrCard = styled(Card)(
    ({ theme }) => css`
        border-radius: ${theme.borderRadius};
        padding: 3rem;
        width: 100%;
        ${theme.breakpoints.down("mobile")} {
            padding: 2rem;
            .qr-card-cont {
                row-gap: 2rem;
            }
            .store-link,
            .store-link > button {
                width: 100%;
            }
        }
    `,
);

export const QrImage = styled(Image)(
    ({ theme }) => css`
        width: 14rem;
        height: 14rem;
        ${theme.breakpoints.down("mobile")} {
            width: 10rem;
            height: 10rem;
        }
    `,
);
