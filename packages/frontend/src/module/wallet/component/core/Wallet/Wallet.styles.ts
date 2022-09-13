import { Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const WalletNotConnected = styled(Row)(
    ({ theme }) => css`
        ${theme.breakpoints.down("mobile")} {
            .get-started-text {
                display: none;
            }
        }
    `,
);
