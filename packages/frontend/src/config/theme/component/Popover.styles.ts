import { css } from "styled-components";

export const PopoverStyles = css(({ theme }) => {
    return css`
        .PopoverPopper {
            background-color: ${theme.palette.card};
            .PopperArrow {
                &:before {
                    background: inherit;
                }
            }
        }
    `;
});
