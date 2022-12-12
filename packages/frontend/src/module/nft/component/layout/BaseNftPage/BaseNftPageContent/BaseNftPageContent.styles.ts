import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const BaseNftPageContentCard = styled(Card)(
    ({ theme }) => css`
        width: 100%;
        padding: 1.5rem;

        ${theme.breakpoints.up("nftPage")} {
            max-width: 41.5625rem;
        }
    `,
);

export const BaseNftPageImageWrapper = styled.div(
    ({ theme }) => css`
        overflow: hidden;
        border-radius: ${theme.borderRadiusMd};

        aspect-ratio: 1;
        height: auto;

        > * {
            aspect-ratio: 1;
            width: 100%;
            height: 100%;
        }
    `,
);

export const BaseNftPageInfoWrapper = styled(Col).attrs({ flex: 1, gap: "1.5rem" })(
    ({ theme }) => css`
        .Label.TopPlacement {
            color: ${theme.palette.label.outlined};
        }
    `,
);
