import { Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const WalletNotConnectedRoot = styled(Row)(
    ({ theme }) => css`
        ${theme.breakpoints.down("mobile")} {
            .get-started-text {
                display: none;
            }
        }
    `,
);
