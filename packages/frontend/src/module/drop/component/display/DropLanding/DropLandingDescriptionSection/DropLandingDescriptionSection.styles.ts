import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import { DropLandingDescriptionSectionRootProps } from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.types";
import { alpha } from "@peersyst/react-utils";
import lightTheme from "config/theme/lightTheme";
import darkTheme from "config/theme/darkTheme";

export const DropLandingDescriptionSectionRoot = styled(Row).attrs({
    flex: 1,
    justifyContent: "center",
})<DropLandingDescriptionSectionRootProps>(({ cover, fontLuminance }) => {
    if (cover !== undefined && fontLuminance !== undefined) {
        const maskColor = alpha(fontLuminance < 0.5 ? lightTheme.palette.background : darkTheme.palette.background, 0.64);

        return css`
            position: relative;
            overflow: hidden;

            &:before {
                content: "";

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background: linear-gradient(${maskColor}, ${maskColor}), url(${cover}) no-repeat center;
                background-size: cover;
                filter: blur(128px);
            }
        `;
    } else
        return css`
            position: relative;
            overflow: hidden;
        `;
});

export const DropLandingDescriptionSectionContent = styled(Row).attrs({
    flex: 1,
    justifyContent: "space-between",
    gap: "2.5rem",
    breakpoint: { width: "dropLandingPage", reverse: true, alignItems: "stretch" },
})(
    ({ theme }) => css`
        position: relative;

        padding: 5.5rem 6rem 10rem;
        max-width: var(--page-max-width);

        ${theme.breakpoints.down("dropLandingPage")} {
            padding: 5rem var(--horizontal-page-padding);
        }
    `,
);

export const DropLandingImage = styled(Image)(
    ({ theme }) => css`
        width: 100%;
        max-width: 360px;
        max-height: 360px;
        aspect-ratio: 1;
        border-radius: ${theme.borderRadiusMd};
    `,
);
