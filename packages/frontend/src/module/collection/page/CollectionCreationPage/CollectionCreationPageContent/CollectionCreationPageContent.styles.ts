import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import CoverInput from "module/common/component/input/CoverInput/CoverInput";
import AvatarInput from "module/common/component/input/AvatarInput/AvatarInput";

export const CollectionCreationPageContentCard = styled(Card)(
    ({ theme }) => css`
        width: 100%;
        max-width: 29.6rem;
        padding: 1.5rem;

        .Divider {
            color: ${theme.palette.black[80]};
        }

        && .Upload {
            border-radius: ${theme.borderRadius};
        }
    `,
);

export const CollectionCoverInput = styled(CoverInput).attrs({ placeholderVariant: "secondary" })`
    height: 7.5rem;
`;

export const CollectionImgInput = styled(AvatarInput).attrs({ size: "md", placeholderVariant: "secondary" })(
    ({ theme }) => css`
        color: ${theme.palette.card};
    `,
);
