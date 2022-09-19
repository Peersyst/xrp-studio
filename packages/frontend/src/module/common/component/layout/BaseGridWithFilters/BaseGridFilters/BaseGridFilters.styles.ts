import { Divider, Modal } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const BaseGridFiltersRoot = styled(Card)(
    () => css`
        height: fit-content;
        width: 16.5rem;
        padding: 1.25rem 1.25rem 1.75rem 1.25rem;
        position: fixed;
        z-index: 2;
        top: 22.7rem;
    `,
);

export const FiltersDivider = styled(Divider)(
    ({ theme }) => css`
        color: ${theme.palette.black[70]};
    `,
);

const FILTER_MODAL_HEIGHT = "90vh";

export const FiltersModal = styled(Modal)(() => ({
    bottom: 0,
    minWidth: "100%",
    alignSelf: "flex-end",
    minHeight: "60vh",
    height: "auto",
    maxHeight: FILTER_MODAL_HEIGHT,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    padding: "45px 0 45px 0",
    borderRadius: "20px 20px 0 0",
    ["> *"]: {
        overflow: "auto",
        maxHeight: `calc(${FILTER_MODAL_HEIGHT} - 69px)`,
    },
    ["p"]: {
        fontSize: "1.15rem",
    },
    [".hide-filters"]: {
        justifyContent: "center",
    },
    [".filters-cont"]: {
        padding: "0 1.5rem",
    },
}));
