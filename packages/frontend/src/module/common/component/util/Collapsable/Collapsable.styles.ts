import styled, { css } from "styled-components";
import { Col, Divider, Row } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

export const CollapsableRoot = styled(Col)(
    ({ theme }) => css`
        position: sticky;
        bottom: 0;
        width: 100vw;
        align-self: center;
        background-color: ${theme.palette.background};
    `,
);

export const CollapsableHeader = styled(Row).attrs({ justifyContent: "center", alignItems: "center" })`
    position: relative;
    padding-bottom: 2rem;
`;

export const CollapsableDivider = styled(Divider)`
    position: absolute;
`;

export const CollapsableButton = styled(Button).attrs({ variant: "tertiary", size: "sm" })`
    position: absolute;
`;

export const CollapsableBody = styled.div`
    max-width: var(--page-max-width);
    margin: 0 auto;
    padding: 1rem var(--horizontal-page-padding) 2rem;
`;
