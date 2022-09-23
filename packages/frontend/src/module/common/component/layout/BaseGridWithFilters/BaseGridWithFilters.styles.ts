import { Col } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { GridWrapperProps } from "./BaseGridWithFilters.types";

export const GridWrapper = styled(Col)<GridWrapperProps>(
    ({ isOpen, theme }) => css`
        max-width: ${isOpen ? "calc(100% - 18rem)" : "100%"};
        ${theme.breakpoints.down(theme.breakpoints.values.nftsGrid.sm)} {
            max-width: 100%;
        }
    `,
);
