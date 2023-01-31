import styled, { css } from "styled-components";
import { Chip } from "@peersyst/react-components";

export const NftStatusChipRoot = styled(Chip)(
    ({ theme }) => css`
        text-transform: capitalize;

        &&& {
            color: ${theme.palette.text};

            &.draft {
                background-color: ${theme.palette.black[75]};
            }

            &.pending {
                background-color: ${theme.palette.status.warning};
            }

            &.confirmed {
                background-color: ${theme.palette.status.success};
            }

            &.failed {
                background-color: ${theme.palette.status.error};
            }
        }
    `,
);
