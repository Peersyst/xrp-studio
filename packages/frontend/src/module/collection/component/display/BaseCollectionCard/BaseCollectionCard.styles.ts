import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { BaseCollectionCardSizeProps } from "./BaseCollectionCard.types";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

export const BaseCollectionCardRoot = styled(ConditionalLink)<BaseCollectionCardSizeProps>(
    ({ theme, size, gridWidth }) => css`
        display: flex;
        flex-direction: column;
        position: relative;
        width: ${gridWidth ? "100%" : "22.5rem"};
        height: ${size == "md" ? "12rem" : "18.75rem"};
        border-radius: ${theme.borderRadiusMd};
        background-color: ${theme.palette.black["85"]};
        transition: background-color 200ms;

        &:hover {
            background-color: ${theme.palette.black["80"]};
        }
    `,
);

export const BaseCollectionCardCover = styled(Image)<BaseCollectionCardSizeProps>(
    ({ theme, size }) => css`
        width: inherit;
        height: ${size == "md" ? "67%" : "78%"};
        border-radius: ${theme.borderRadiusMd};
        max-width: unset;
    `,
);

export const BaseCollectionCardFooter = styled(Row).attrs({ gap: "0.35rem", flex: 1 })`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.75rem 1rem;
`;

export const GroupAvatar = styled(Avatar).attrs({ size: "md" })(
    ({ theme }) => css`
        color: ${theme.palette.black["85"]};
    `,
);
