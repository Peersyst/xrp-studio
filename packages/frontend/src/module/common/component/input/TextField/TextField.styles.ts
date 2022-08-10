import { TextField, TextFieldProps } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const TextFieldRoot = styled(TextField)<TextFieldProps>(
    ({ theme }) => css`
        .TextInput {
            background-color: ${theme.palette.black["2.5"]};
            border: 1px solid ${theme.palette.black[30]};
            color: ${theme.palette.black[60]};
            font-weight: 500;
            font-size: 16px;
            width: 100%;
            &:hover {
                border: 1px solid ${theme.palette.primary};
                color: ${theme.palette.black[100]};
            }
            &.Focused {
                border: 1px solid ${theme.palette.primary};
                color: ${theme.palette.black[100]};
            }
            &.Error {
            }
            &.disabled: {
            }
        }
    `,
);
