import styled from "styled-components";
import { Paper } from "@peersyst/react-components";

export const BaseCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 264px;
    height: 384px;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    transition: outline 200ms;
    outline: 1px solid #1b1b1b;
`;
