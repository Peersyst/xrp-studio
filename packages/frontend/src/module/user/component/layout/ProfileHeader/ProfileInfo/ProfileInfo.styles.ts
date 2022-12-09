import styled, { css } from "styled-components";
import { Col, Row } from "@peersyst/react-components";

export const ProfileInfoRoot = styled(Col).attrs({ flex: 1 })(
    ({ theme }) => css`
        max-width: 100%;
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
            padding-left: 0;
            align-items: center;
        }
    `,
);

export const ProfileMainInfo = styled(Row).attrs({ gap: "1rem", alignItems: "center", breakpoint: { width: "mobile", gap: "1rem" } })(
    ({ theme }) => css`
        max-width: 70%;

        ${theme.breakpoints.down("sm")} {
            max-width: 100%;
        }
    `,
);

export const ProfileButtons = styled(Row)(
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
