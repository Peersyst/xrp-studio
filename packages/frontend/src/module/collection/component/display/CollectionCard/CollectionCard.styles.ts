import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { CollectionCardRootProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";

export const CollectionCardRoot = styled.div<CollectionCardRootProps>(
    ({ theme, size }) => css`
        display: flex;
        flex-direction: column;
        position: relative;
        width: 22.5rem;
        height: ${size == "md" ? "12rem" : "18.75rem"};
        border-radius: ${theme.borderRadiusMd};
        background-color: ${theme.palette.black["85"]};
    `,
);

export const CollectionCardCover = styled(Image)<CollectionCardRootProps>(
    ({ theme, size }) => css`
        width: inherit;
        height: ${size == "md" ? "67%" : "78%"};
        border-radius: ${theme.borderRadiusMd};
    `,
);

export const CollectionCardFooter = styled(Row).attrs({ gap: "0.75rem", flex: 1 })`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.75rem 1rem;
`;

export const CollectionAvatar = styled(Avatar).attrs({ size: "md" })(
    ({ theme }) => css`
        color: ${theme.palette.black["85"]};
    `,
);
