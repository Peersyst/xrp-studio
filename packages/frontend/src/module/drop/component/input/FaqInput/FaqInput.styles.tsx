import styled, { css } from "styled-components";
import { Col, TextArea, Button } from "@peersyst/react-components";
import TextField from "module/common/component/input/TextField/TextField";
import { FaqInputRootProps } from "./FaqInput.types";

export const FaqsInputRoot = styled(Col).attrs({ gap: "1rem", alignItems: "center" })<FaqInputRootProps>(
    ({ hasLabel }) => css`
        width: ${hasLabel && "100%"};
    `,
);

export const FaqInputTextField = styled(TextField)`
    flex: 1;
`;

export const FaqInputTextAreaField = styled(TextArea)`
    flex: 1;
`;

export const DeleteFaqButton = styled(Button)(
    ({ theme }) => css`
        color: ${theme.palette.status.error};
        padding: 0 1rem;
    `,
);
