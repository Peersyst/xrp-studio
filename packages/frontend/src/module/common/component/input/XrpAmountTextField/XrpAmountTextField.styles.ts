import styled, { css } from "styled-components";
import NumericTextField from "../NumericTextField/NumericTextField";

export const XrpAmountTextFieldRoot = styled(NumericTextField)(
    () => css`
        .Label {
            width: 100%;
        }
    `,
);
