import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const ImageInputDisplay = styled(Image)(
    ({ theme }) => css`
        border-radius: ${theme.borderRadiusLg};
    `,
);
