import styled from "styled-components";

export const HeaderMenuButtonRoot = styled.div`
    display: contents;
    ${(p) => p.theme.breakpoints.up("mobile")} {
        display: none;
    }

    font-size: 1.8rem;
`;
