import { Popover } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const NftCardStatusChipRoot = styled(Popover)(
    () => css`
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    `,
);

export const NftCardStatusChipPopoverCard = styled(Card)(
    () => css`
        max-width: 22rem;
        padding: 0.5rem;
    `,
);
