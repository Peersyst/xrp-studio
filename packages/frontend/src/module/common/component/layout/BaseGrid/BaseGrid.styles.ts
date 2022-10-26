import styled from "styled-components";
import { Grid } from "@peersyst/react-components";
import { STICKY_HEADER_HEIGHT } from "../PageHeader/PageHeader.styles";
import { GRID_FILTERS_GAP } from "../BaseGridWithFilters/BaseGridWithFilters.styles";

export const BaseGridRoot = styled(Grid)`
    overflow: visible;
    width: 100%;
    margin: 0;
    min-height: calc(100vh - var(--appbar-height) - ${STICKY_HEADER_HEIGHT} - ${GRID_FILTERS_GAP} - 2rem - 8rem);
`;
