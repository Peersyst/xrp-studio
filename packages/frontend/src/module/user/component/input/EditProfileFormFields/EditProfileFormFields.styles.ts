import TextField from "module/common/component/input/TextField/TextField";
import styled, { css } from "styled-components";

export const HalfWidthTextField = styled(TextField)(
    () => css`
        flex: 1;
        min-width: min(14rem, 100%);
    `,
);
