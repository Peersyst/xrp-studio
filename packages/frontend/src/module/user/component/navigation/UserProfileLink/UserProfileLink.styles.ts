import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const UserProfileLinkRoot = styled(Link)(
    ({ theme }) => css`
        display: flex;
        width: 100%;

        &:hover {
            color: ${theme.palette.primary};
        }
    `,
);
