import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";

export const NavigationButtonRoot = styled(Button)<ButtonProps>(({ theme }) => {
    return css`
        &.Button {
            height: 4.5rem;
            width: 4.5rem;
            min-width: 4.5rem;
            background: ${theme.palette.black[10]};
            border-radius: 6px;
            border: 0;
            padding: 0;
        }
    `;
});
