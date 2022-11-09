import { Popover } from "@peersyst/react-components";
import Card from "module/common/component/surface/Card/Card";
import styled, { css } from "styled-components";

export const PopoverRoot = styled(Popover)(
    () => css`
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        text-transform: capitalize;
    `,
);

export const PopoverCard = styled(Card)(
    () => css`
        padding: 0.5rem;
    `,
);
