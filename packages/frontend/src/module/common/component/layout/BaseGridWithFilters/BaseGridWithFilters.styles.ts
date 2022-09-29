import { Col, TransitionStyles } from "@peersyst/react-components";
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

export const gridAnimation: TransitionStyles = {
    enter: {
        transform: "translateX(0)",
    },
    entering: {
        transform: "translateX(18rem)",
    },
    entered: {
        transform: "translateX(18rem)",
    },
    exit: {
        transform: "translateX(18rem)",
    },
    exiting: {
        transform: "translateX(0)",
    },
    exited: {
        transform: "translateX(0)",
    },
};
