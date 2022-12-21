import styled, { css } from "styled-components";
import { Image, ProgressBar, Row } from "@peersyst/react-components";
import { DropLandingDescriptionSectionRootProps } from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection.types";
import { alpha, getLuminance } from "@peersyst/react-utils";

export const DropLandingDescriptionSectionRoot = styled(Row).attrs({
    flex: 1,
    justifyContent: "center",
})<DropLandingDescriptionSectionRootProps>(({ cover, theme }) => {
    if (cover !== undefined) {
        const maskColor =
            getLuminance(theme.palette.background) > 0.5 ? alpha(theme.palette.background, 0.32) : alpha(theme.palette.background, 0.64);

        return css`
            position: relative;
            overflow: hidden;
            background: url(${cover}) no-repeat center;
            background-size: cover;

            &:before {
                content: "";

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-color: ${maskColor};
                backdrop-filter: blur(128px);
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

export const MintProgress = styled(ProgressBar)(
    ({ theme }) => css`
        color: ${theme.palette.text};
        background-color: ${theme.palette.primary};
    `,
);
