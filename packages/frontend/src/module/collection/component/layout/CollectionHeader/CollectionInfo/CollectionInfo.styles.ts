import styled, { css } from "styled-components";
import { Col, Row } from "@peersyst/react-components";

export const CollectionInfoRoot = styled(Col).attrs({ flex: 1 })(
    ({ theme }) => css`
        ${theme.breakpoints.down("md")} {
            .collection-name {
                font-size: ${theme.typography.h6.style.fontSize};
            }

            .collection-description {
                font-size: ${theme.typography.body2.style.fontSize};
            }
        }

        ${theme.breakpoints.down("mobile")} {
            .collection-name {
                font-size: ${theme.typography.subtitle1.style.fontSize};
            }
        }
    `,
);

export const CollectionMainInfo = styled(Row).attrs({ gap: "1rem", alignItems: "center", breakpoint: { width: "mobile", gap: "1rem" } })(
    ({ theme }) => css`
        max-width: 70%;

        ${theme.breakpoints.down("sm")} {
            max-width: 100%;
        }
    `,
);

export const CollectionsButtons = styled(Row)(
    ({ theme }) => css`
        ${theme.breakpoints.down("sm")} {
            position: absolute;
            right: calc(var(--horizontal-page-padding) - 1.65rem) !important;
            top: 5rem;
            left: 0;
        }

        ${theme.breakpoints.down("mini")} {
            right: calc(var(--horizontal-page-padding) + 1rem);
        }
    `,
);
