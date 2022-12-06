import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const ExploreBannerRoot = styled(Image)(
    ({ theme }) => css`
        flex: 1;
        height: 22.5rem;
        width: 100%;
        max-width: unset;
        border-radius: ${theme.borderRadiusMd};
    `,
);
