import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import Avatar from "module/common/component/display/Avatar/Avatar";

export interface CollectionHeaderRootProps {
    image: string | undefined;
}

export const CollectionHeaderRoot = styled(PageHeader)<CollectionHeaderRootProps>(
    ({ theme, image }) => css`
        .main-header {
            position: relative;
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            margin: var(--appbar-height) 0 0 0;
            max-width: 100%;
            --collection-cover-height: 13.5vw;

            ${theme.breakpoints.down("md")} {
                --collection-cover-height: 14.6vw;
            }

            ${theme.breakpoints.down("mini")} {
                --collection-cover-height: 25vw;
            }

            div:first-child {
                max-width: initial;
            }
        }

        .sticky-header {
            background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image});
            background-size: cover;
            background-position: 50% 50%;
        }
    `,
);

export const CollectionCover = styled(Image)(
    ({ theme }) => css`
        align-self: center;
        width: 100vw;
        height: var(--collection-cover-height);
        flex-shrink: 0;
        border-radius: ${theme.borderRadius};
    `,
);

export const CollectionHeaderFooter = styled(Row).attrs({ gap: "1rem", flex: 1 })(
    ({ theme }) => css`
        --collection-avatar-width: 172px;
        --collection-avatar-left: 23vw;
        --collection-avatar-top: var(--collection-cover-height);
        width: calc(var(--page-max-width));

        ${theme.breakpoints.down("md")} {
            --collection-avatar-width: max(9.5rem, 13vw);
            --collection-avatar-left: 18vw;
            width: 100%;
            .collection-back {
                position: relative;
            }
        }

        ${theme.breakpoints.down("sm")} {
            --collection-avatar-width: max(9.5rem, 13vw);
            --collection-avatar-left: 14vw;
            .collection-back {
                left: var(--collection-back-left);
            }
        }

        ${theme.breakpoints.down("mobile")} {
            --collection-avatar-width: max(2rem, 15vw);
            --collection-avatar-left: 15vw;
            --collection-back-left: 0vw;
            width: 100%;

            .collection-back {
                width: 2rem;
                height: 2rem;
            }
            .collection-back {
                left: var(--collection-back-left);
                top: calc(calc((var(--collection-cover-height)) / 1.3) * -1);
            }
        }

        min-height: calc(calc(calc(var(--collection-avatar-width) / 1.8)) - 2rem);
        margin: auto;
    `,
);

export const ContentAvatar = styled(Avatar).attrs({ size: "xl" })(
    ({ theme }) => css`
        position: absolute;
        top: calc(var(--collection-avatar-top) + 3rem);
        left: var(--collection-avatar-left);
        transform: translateY(-50%);
        color: ${theme.palette.background};

        width: var(--collection-avatar-width) !important;
        height: auto !important;

        ${theme.breakpoints.down("md")} {
            top: calc(var(--collection-avatar-top) + 1hw);
        }

        ${theme.breakpoints.down("mobile")} {
            left: calc(var(--collection-avatar-top) + 1hw);
        }
    `,
);
