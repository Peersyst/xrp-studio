import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";

export const SocialButtonRoot = styled(Button)<ButtonProps>(({ theme }) => {
    return css`
        &.Button {
            height: 2.375rem;
            width: 2.875rem;
            min-width: 2.875rem;
            background: ${theme.palette.black[5]};
            border-radius: 6px;
            border: 0;
            padding: 0;
        }
    `;
});
