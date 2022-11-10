import { Expandable } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const ExpandableFilterRoot = styled(Expandable)(
    ({ theme }) => css`
        .ExpandableDisplay {
            border-bottom: none;
            padding: 0;
            .Icon {
                color: ${theme.palette.black["60"]};
                font-size: 0.65rem;
            }
        }
        .ExpandableContent {
            padding: 0.75rem 0 0;
        }
    `,
);
