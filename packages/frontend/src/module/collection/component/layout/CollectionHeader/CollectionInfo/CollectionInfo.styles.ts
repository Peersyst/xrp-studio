import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const CollectionInfoRoot = styled(Col).attrs({ flex: 1 })(
    ({ theme }) => css`
        max-width: 100%;
        position: absolute;
        left: calc(var(--collection-avatar-left) + var(--collection-avatar-width) + 3rem);
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
            left: calc(var(--collection-avatar-left) + var(--collection-avatar-width) + 1rem);
        }
    `,
);
