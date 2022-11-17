import styled, { css } from "styled-components";
import { Player as BasePlayer, Skeleton } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

export const PlayerRoot = styled(BasePlayer).attrs({ light: true })(
    ({ theme }) => css`
        overflow: hidden;
        border-radius: ${theme.borderRadiusLg};
        width: 100%;
        aspect-ratio: 1.79;
    `,
);

export const PlayButton = styled(Button).attrs({ variant: "glass" })(
    ({ theme }) => css`
        width: 6.5rem;
        height: 6.5rem;
        font-size: 3.5rem;
        padding: 1.5rem;
        border-radius: ${theme.borderRadiusLg};
    `,
);

export const PlayerSkeleton = styled(Skeleton)(
    ({ theme }) => css`
        border-radius: ${theme.borderRadiusLg};
        width: 100%;
        max-width: unset;
        aspect-ratio: 1.79;
    `,
);
