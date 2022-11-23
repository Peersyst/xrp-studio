import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";

export const CollectionHeader = styled(Image)(
    ({ theme }) => css`
        width: 100%;
        max-width: unset;
        height: auto;
        aspect-ratio: 4;
        border-radius: ${theme.borderRadiusMd};
    `,
);

export const CollectionImage = styled(Avatar)`
    align-self: center;
    margin-top: -11.25%;
    width: 25% !important;
    height: auto !important;
`;
