import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const BaseNftPageContentCard = styled(Card)(
    ({ theme }) => css`
        width: 100%;
        padding: 1.5rem;

        .Divider {
            color: ${theme.palette.black[80]};
        }
    `,
);

export const BaseNftPageImageWrapper = styled.div`
    > * {
        aspect-ratio: 1;
        height: auto;
    }
`;
