import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const ProfileInfoRoot = styled(Col).attrs({ flex: 1 })(
    ({ theme }) => css`
        padding-left: calc(var(--profile-avatar-width) + 1rem);

        ${theme.breakpoints.down("md")} {
            .profile-name {
                font-size: ${theme.typography.h6.style.fontSize};
            }

            .profile-description {
                font-size: ${theme.typography.body2.style.fontSize};
            }
        }

        ${theme.breakpoints.down("mobile")} {
            .profile-name {
                font-size: ${theme.typography.subtitle1.style.fontSize};
            }
        }
    `,
);

export const ProfileButtons = styled.div(
    ({ theme }) => css`
        ${theme.breakpoints.down("sm")} {
            position: absolute;
            right: calc(var(--horizontal-page-padding) - 1.65rem);
            top: 1rem;
        }

        ${theme.breakpoints.down("mini")} {
            right: calc(var(--horizontal-page-padding) + 1rem);
        }
    `,
);
