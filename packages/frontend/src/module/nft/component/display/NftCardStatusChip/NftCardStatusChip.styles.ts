import { Chip } from "@peersyst/react-components";
import { Popover } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const NftCardChip = styled(Chip)(
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

            &.failed {
                background-color: ${theme.palette.status.error};
            }
        }
    `,
);

export const NftStatusChipRoot = styled(Popover)(
    () => css`
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    `,
);

export const NftStatusChipPopoverCard = styled(Card)(
    () => css`
        max-width: 22rem;
        padding: 0.5rem;
    `,
);
