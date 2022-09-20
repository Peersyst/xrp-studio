import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { ProfileInfoRoot } from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";

export interface ProfileHeaderRootProps {
    image: string | undefined;
}

export const ProfileHeaderRoot = styled(PageHeader)<ProfileHeaderRootProps>(
    ({ theme, image }) => css`
        .main-header {
            position: relative;
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            margin-top: var(--appbar-height);
            padding-bottom: 0;

            --profile-cover-height: 15.25rem;

            ${theme.breakpoints.down("md")} {
                --profile-cover-height: 17.6vw;
            }

            ${theme.breakpoints.down("mini")} {
                --profile-cover-height: 28vw;
            }
        }

        .sticky-header {
            background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image});
            background-size: cover;
            background-position: 50% 50%;
        }

        // Responsive layout, display these element in different places depending on the breakpoint
        .account-address {
            display: none;

            ${theme.breakpoints.down("mobile")} {
                display: flex;
                width: fit-content;
            }
        }

        .profile-description {
            display: none;

            ${theme.breakpoints.down("md")} {
                display: block;
            }
        }

        ${ProfileInfoRoot} {
            .account-address {
                display: flex;

                ${theme.breakpoints.down("mobile")} {
                    display: none;
                }
            }

            .profile-description {
                display: block;

                ${theme.breakpoints.down("md")} {
                    display: none;
                }
            }
        }
    `,
);

export const ProfileCover = styled(Image)(
    ({ theme }) => css`
        align-self: center;
        width: calc(var(--page-max-width) + 7rem);
        height: var(--profile-cover-height);
        flex-shrink: 0;
        border-radius: ${theme.borderRadius};

        ${theme.breakpoints.down("md")} {
            width: 92vw;
        }

        ${theme.breakpoints.down("mobile")} {
            width: calc(100vw - calc(var(--horizontal-page-padding) * 2));
        }
    `,
);

export const ProfileHeaderFooter = styled(Row).attrs({ gap: "1rem", flex: 1 })(
    ({ theme }) => css`
        --profile-avatar-width: 216px;
        --profile-avatar-top: var(--profile-cover-height);

        min-height: calc(calc(calc(var(--profile-avatar-width) / 1.8)) - 2rem);
        ${theme.breakpoints.up("sm")} {
            margin-left: auto;
            margin-right: auto;
            max-width: 100%;
            width: var(--page-max-width);
        }
        ${theme.breakpoints.down("md")} {
            --profile-avatar-width: max(9.5rem, 13vw);
        }

        ${theme.breakpoints.down("mini")} {
            --profile-avatar-width: max(6rem, 20vw);
        }
    `,
);

export const ProfileAvatar = styled(Avatar).attrs({ size: "lg" })(
    ({ theme }) => css`
        position: absolute;
        top: var(--profile-avatar-top);
        transform: translateY(-50%);
        color: ${theme.palette.background};

        width: var(--profile-avatar-width) !important;
        height: auto !important;
    `,
);
