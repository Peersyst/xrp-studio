import styled, { css } from "styled-components";
import { DropLandingSection } from "module/drop/component/display/DropLanding/DropLanding.styles";

export const DropLandingVideoSectionRoot = styled(DropLandingSection)(
    () => css`
        background-color: inherit;
        // Set negative margin top to Skeleton and Player
        > .Skeleton,
        > .Skeleton > *:first-child {
            background-color: inherit;
            margin-top: -4rem;
        }
    `,
);
