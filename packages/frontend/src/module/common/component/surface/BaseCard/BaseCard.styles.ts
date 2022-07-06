import styled from "styled-components";
import { Paper } from "@peersyst/react-components";

export const BaseCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;

    display: flex;
    flex-direction: column;

    width: 22rem;
    height: 28rem;
    min-width: 11.67rem;
    min-height: 15.56rem;

    cursor: pointer;
    user-select: none;

    background-color: #0a0a0a;
    outline: 1px solid #1b1b1b;
    overflow: hidden;

    transition: outline 200ms;
    &:hover {
    outline: 1px solid #ffffff;
`;
