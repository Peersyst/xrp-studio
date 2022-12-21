import styled, { css } from "styled-components";
import { alpha } from "@peersyst/react-utils";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

export const ArtistCardRoot = styled(ConditionalLink)(
    ({ theme }) => css`
        &:hover .username {
            color: ${alpha(theme.palette.primary, 0.8)};
        }
    `,
);
