import { Divider, Modal } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";
import { STICKY_HEADER_HEIGHT } from "module/common/component/layout/PageHeader/PageHeader.styles";
import { GRID_FILTERS_GAP } from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters.styles";

export const BaseGridFiltersRoot = styled(Card)`
    position: sticky;
    top: calc(var(--appbar-height) + ${STICKY_HEADER_HEIGHT} + ${GRID_FILTERS_GAP});
    max-height: calc(100vh - var(--appbar-height) - ${STICKY_HEADER_HEIGHT} - ${GRID_FILTERS_GAP} - 2rem);
    overflow-y: auto;
    height: fit-content;
    width: 16.5rem;
    padding: 1.25rem 1.25rem 1.75rem 1.25rem;
    // Negative margin in order to remove the space occupied
    margin-right: -16.5rem;
    // Margin top in order to equal filter tags gap
    margin-top: ${GRID_FILTERS_GAP};
`;

export const FiltersDivider = styled(Divider)(
    ({ theme }) => css`
        color: ${theme.palette.black[70]};
    `,
);

const FILTER_MODAL_HEIGHT = "90vh";

export const FiltersModal = styled(Modal)(({ theme }) => ({
    bottom: 0,
    minWidth: "100%",
    alignSelf: "flex-end",
    minHeight: "60vh",
    height: "auto",
    maxHeight: FILTER_MODAL_HEIGHT,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    padding: "1.5rem 0",
    borderRadius: `${theme.borderRadiusLg} ${theme.borderRadiusLg} 0 0`,
    ["> *"]: {
        overflow: "auto",
        maxHeight: `calc(${FILTER_MODAL_HEIGHT} - 69px)`,
    },
    [".hide-filters"]: {
        justifyContent: "center",
    },
    [".filters-cont"]: {
        padding: "0 1.5rem",
    },
}));
