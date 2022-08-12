import styled, { css } from "styled-components";
import { Col, Typography, TypographyProps } from "@peersyst/react-components";

export const TypographyUpload = styled(Typography)<TypographyProps>(
    ({ theme }) => css`
        text-decoration: none;
        color: ${theme.palette.black[30]};
        font-weight: 400;
        align-self: center;
        font-size: 1rem;
    `,
);

export const UploadRoot = styled(Col)(
    ({ theme }) => css`
        width: 20rem;
        height: 20rem;
        background-color: ${theme.palette.black[10]};
        border-radius: 10px;
    `,
);
