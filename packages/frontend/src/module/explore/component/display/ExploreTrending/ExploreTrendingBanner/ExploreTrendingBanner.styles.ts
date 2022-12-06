import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const BaseExploreBanner = styled(Image)(
    ({ theme }) => css`
        height: 22.5rem;
        border-radius: ${theme.borderRadiusMd};
    `,
);
