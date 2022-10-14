import { Col } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const EditProfileDialogModalBodyRoot = styled(Col).attrs({ flex: 1, justifyContent: "space-between", gap: "1.5rem" })(
    ({ theme }) => css`
        padding: 0 3rem 3.5rem;
        ${theme.breakpoints.down("mobile")} {
            padding: 0 2rem 2.5rem;
        }
    `,
);
