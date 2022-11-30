import styled, { css } from "styled-components";

export interface NebulaRootProps {
    height?: string;
    rotate?: string;
}
export const NebulaRoot = styled("div")<NebulaRootProps>(
    ({ height, rotate }) => css`
        position: absolute;
        height: ${height ? height : "100%"};
        overflow: hidden;
        transform: ${rotate ? rotate : "none"};
        width: 100%;
    `,
);
