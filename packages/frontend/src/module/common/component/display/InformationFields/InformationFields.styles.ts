import styled, { css } from "styled-components";
import { Label } from "@peersyst/react-components";
import { InformationFieldLabelProps } from "module/common/component/display/InformationFields/InformationFields.types";

export const InformationFieldLabel = styled(Label)<InformationFieldLabelProps>(
    ({ theme, variant }) => css`
        ${theme.typography[variant].style}
    `,
);
