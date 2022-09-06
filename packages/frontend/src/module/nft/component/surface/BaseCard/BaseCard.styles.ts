import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const BaseCardRoot = styled(Col).attrs({ gap: "1.5rem" })`
    min-height: 19rem;
    width: 100%;
`;

export const BaseCardCover = styled.div(
    () => css`
        .Skeleton {
            max-width: unset;
        }
    `,
);
