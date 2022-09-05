import styled from "styled-components";
import { Col } from "@peersyst/react-components";

export const BaseCardRoot = styled(Col).attrs({ gap: "1.5rem" })`
    width: 16.5rem;
    min-height: 19rem;
`;

export const BaseCardCover = styled.div`
    width: 16.5rem;
    height: 16.5rem;
    .Skeleton {
        max-width: unset;
    }
`;
