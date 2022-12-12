import styled, { css } from "styled-components";
import { alpha } from "@peersyst/react-utils";
import { Link } from "react-router-dom";

export const ArtistCardRoot = styled(Link)(
    ({ theme }) => css`
        &:hover .username {
            color: ${alpha(theme.palette.primary, 0.8)};
        }
    `,
);
