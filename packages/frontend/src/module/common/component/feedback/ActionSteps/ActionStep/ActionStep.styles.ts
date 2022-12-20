import { AlertCircleIcon, CheckCircleIcon } from "icons";
import styled, { css } from "styled-components";

export const CheckCircleIconRoot = styled(CheckCircleIcon)(
    ({ theme }) => css`
        color: ${theme.palette.status.success};
    `,
);

export const AlertTriangleIconRoot = styled(AlertCircleIcon)(
    ({ theme }) => css`
        color: ${theme.palette.status.warning};
    `,
);

export const AlertCircleIconRoot = styled(AlertCircleIcon)(
    ({ theme }) => css`
        color: ${theme.palette.status.error};
    `,
);
