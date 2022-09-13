import Button from "module/common/component/input/Button/Button";
import styled, { css } from "styled-components";

export const HideFiltersButton = styled(Button)(
    ({ theme }) => css`
        .hide-filters-icon {
            border-radius: 50%;
            padding: 0.5rem;
            width: 2.5rem;
            height: 2.5rem;
            &:hover {
                background-color: ${theme.palette.black[70]};
            }
        }
    `,
);
