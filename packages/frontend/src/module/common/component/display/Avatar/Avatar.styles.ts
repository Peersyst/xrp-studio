import styled from "styled-components";

export const AvatarRoot = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
})`
    > path[stroke] {
        stroke: currentColor;
    }
`;
