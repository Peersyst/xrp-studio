import { emphasize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import styled, { css } from "styled-components";

export const ButtonBuyNftInDropRoot = styled(Button)(
    ({ theme }) => css`
        color: ${emphasize(theme.palette.primary, 0.75)};
    `,
);
