import { Col, Typography } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { UploadInputPlaceholderLabelProps } from "./UploadInputPlaceholder.types";
import { greyStyles } from "../UploadInput.styles";
import { emphasize } from "@peersyst/react-utils";

export const UploadInputPlaceholderRoot = styled(Col).attrs({ alignItems: "center", justifyContent: "center", gap: "7.5%" })(
    ({ theme }) => {
        const color = theme.palette.black["85"];
        return css`
            height: 100%;
            width: 100%;

            background: ${color};
            border-radius: ${theme.borderRadiusLg};

            transition: background-color 200ms linear;

            &:hover {
                background: ${emphasize(color, 0.08)};
            }
        `;
    },
);

export const UploadInputPlaceholderLabel = styled(Typography)<UploadInputPlaceholderLabelProps>(
    () => css`
        ${greyStyles};
        text-align: center;
        font-weight: 500;
        font-size: 1.25rem;
    `,
);
