import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper)(({ theme }) => {
    return css`
        background: ${theme.palette.card};
        border-radius: ${theme.borderRadiusMd};

        .Divider {
            color: ${theme.palette.black[80]};
        }

        .Label.TopPlacement {
            color: ${theme.palette.label.filled};
        }
    `;
});
