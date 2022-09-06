import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const BaseCardRoot = styled(Col).attrs({ gap: "1.5rem" })`
    min-height: 19rem;
`;

export const BaseCardCover = styled.div(
    ({ theme }) => css`
        .Skeleton {
            max-width: unset;
        }
        ${theme.breakpoints.down("mini")} {
            width: 70vw;
        }
    `,
);
