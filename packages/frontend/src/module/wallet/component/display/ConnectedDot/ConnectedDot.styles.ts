import styled, { css } from "styled-components";
import { ConnectedDotProps } from "./ConnectedDot.types";

export const ConnectedDotRoot = styled.div<ConnectedDotProps>(
    ({ theme, active }) => css`
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${active ? theme.palette.status.success : theme.palette.gray[90]};
    `,
);
