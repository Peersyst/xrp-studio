import { Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const HideFiltersWrapper = styled(Row).attrs({ justifyContent: "flex-end", alignItems: "center", gap: "0.5rem" })(
    ({ theme }) => css`
        cursor: pointer;
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
