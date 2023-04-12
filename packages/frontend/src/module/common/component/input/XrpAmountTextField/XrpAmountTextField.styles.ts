import styled, { css } from "styled-components";
import NumericTextField from "../NumericTextField/NumericTextField";

export const XrpAmountTextFieldRoot = styled(NumericTextField)(
    ({ theme }) => css`
        .Label {
            width: 100%;
        }
    `,
);
