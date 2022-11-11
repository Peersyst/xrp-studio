import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import Avatar from "module/common/component/display/Avatar/Avatar";
import BackButton from "module/common/component/navigation/BackButton/BackButton";

export interface CollectionHeaderRootProps {
    image: string | undefined;
}

export const CollectionHeaderRoot = styled(PageHeader)<CollectionHeaderRootProps>(
    ({ theme, image }) => css`
        .main-header {
            position: relative;

            margin-top: var(--appbar-height);
            padding-bottom: 1rem;
            border-bottom: 1px solid ${theme.palette.black[80]};

            --collection-cover-height: 13.5vw;

            ${theme.breakpoints.down("md")} {
                --collection-cover-height: 14.6vw;
            }

            ${theme.breakpoints.down("mini")} {
                --collection-cover-height: 25vw;
            }
        }

        .sticky-header {
            background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image});
            background-size: cover;
            background-position: 50% 50%;
        }
    `,
);

export const CollectionCover = styled(Image)`
    align-self: center;
    width: 100vw;
    height: var(--collection-cover-height);
`;

export const CollectionHeaderFooter = styled(Row).attrs({ gap: "2.5rem", flex: 1 })(
    ({ theme }) => css`
        --collection-avatar-width: 172px;
        width: calc(var(--page-max-width));

        min-height: calc(calc(calc(var(--collection-avatar-width) / 1.8)) - 2rem);
        margin: auto;

        ${theme.breakpoints.down("md")} {
            --collection-avatar-width: max(9.5rem, 13vw);
            width: 100%;
            column-gap: 1.5rem;
        }

        ${theme.breakpoints.down("sm")} {
            --collection-avatar-width: max(9.5rem, 13vw);
        }

        ${theme.breakpoints.down("mobile")} {
            --collection-avatar-width: max(7rem, 20vw);
            column-gap: 1rem;
        }
    `,
);

export const CollectionAvatar = styled(Avatar).attrs({ size: "xl" })(
    ({ theme }) => css`
        margin-top: -3.5rem;
        color: ${theme.palette.background};

        width: var(--collection-avatar-width) !important;
        height: auto !important;

        ${theme.breakpoints.down("mobile")} {
            margin-top: -10%;
        }
    `,
);

export const CollectionHeaderBack = styled(BackButton).attrs({ size: "md" })(
    ({ theme }) => css`
        ${theme.breakpoints.down("mobile")} {
            position: absolute;
            top: calc(var(--collection-cover-height) / 2);
            transform: translateY(-50%);
            left: var(--horizontal-page-padding);
        }
    `,
);
