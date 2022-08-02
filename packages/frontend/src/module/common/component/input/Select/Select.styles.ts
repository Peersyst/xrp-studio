import { Select } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { SelectProps } from "@peersyst/react-components";

export const SelectRoot = styled(Select)<SelectProps<any>>(
    ({ theme }) => css`
        margin-top: 10rem;
        margin-bottom: 10rem;
        height: 1.5rem;
        width: 4rem;
        color: #5e676e;
        background-color: #21272c;
        .Select {
            background-color: #21272c;
        }
        .SelectDisplay {
            border: 0px;
        }
        .SelectItem {
            padding: 10px 10px;
            background-color: #21272c;
        }
        .SelectMenu {
            background-color: #21272c;
        }
    `,
);
