import { css } from "styled-components";

export const SelectorStyles = css(({ theme }) => {
    return css`
        .Selector {
            .LabelRoot .Label {
                font-weight: 500;
                color: ${theme.palette.black[30]};
                fontsize: ${theme.typography.body1.style.fontSize};
                transition: color 300ms;
            }
        }
    `;
});
