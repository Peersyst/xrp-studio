import styled, { css } from "styled-components";
import { Col, Typography, TypographyProps, Image, ImageProps } from "@peersyst/react-components";

export const TypographyUpload = styled(Typography)<TypographyProps>(
    ({ theme }) => css`
        text-decoration: none;
        color: ${theme.palette.black[20]};
        align-self: center;
        font-weight: 500;
        font-size: 1.5rem;
    `,
);

export const ImageUpload = styled(Image)<ImageProps>(
    () => css`
        width: 7rem;
        height: 7rem;
        align-self: center;
    `,
);

export const UploadRoot = styled(Col)(
    ({ theme }) => css`
        width: 40.5rem;
        height: 31.375rem;
        background-color: ${theme.palette.black[5]};
        border-radius: 12px;
    `,
);
