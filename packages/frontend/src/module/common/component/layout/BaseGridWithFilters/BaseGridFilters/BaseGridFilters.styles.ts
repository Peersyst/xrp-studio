import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const BaseGridFiltersRoot = styled(Card)(
    () => css`
        height: fit-content;
        width: 16.5rem;
        padding: 1.25rem 1.25rem 1.75rem 1.25rem;
        position: fixed;
        z-index: 2;
        top: 21.5rem;
    `,
);
