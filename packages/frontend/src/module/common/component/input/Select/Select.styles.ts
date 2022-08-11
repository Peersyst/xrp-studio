import { Select } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { SelectProps } from "@peersyst/react-components";

export const SelectRoot = styled(Select)<SelectProps<any>>(
    ({ theme }) => css`
        margin-top: 10rem;
        margin-bottom: 10rem;
        height: 1.5rem;
        color: ${theme.palette.black[30]};
        background-color: ${theme.palette.black[5]};
        .Select {
            background-color: ${theme.palette.black[5]};
        }
        .SelectDisplay {
            border: 0px;
        }
        .SelectItem {
            padding: 10px 10px;
            background-color: ${theme.palette.black[5]};
        }
        .SelectMenu {
            background-color: ${theme.palette.black[5]};
        }
    `,
);
