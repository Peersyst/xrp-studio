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
            button {
                width: 100%;
            }
        }
    `,
);

export const QrImage = styled(Image)(
    ({ theme }) => css`
        width: 100%;
        max-width: 13rem;
        ${theme.breakpoints.down("mobile")} {
            max-width: unset;
            width: 60%;
        }
    `,
);
