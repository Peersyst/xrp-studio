import styled from "styled-components";
import { Paper } from "@peersyst/react-components";

export const BaseCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    height: 23.34rem;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    transition: outline 200ms;
`;
