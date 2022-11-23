import styled, { css } from "styled-components";
import { Col, Button } from "@peersyst/react-components";
import { FaqsInputRootProps, AddFaqButtonProps } from "./FaqsInput.types";

export const FaqInputRoot = styled(Col).attrs({ gap: "1rem" })<FaqsInputRootProps>(
    ({ hasLabel }) => css`
        width: ${hasLabel && "100%"};
    `,
);

// Picked react-components Button instead of custom xrp-studio Button as it fits more accurately into this custom button
export const AddFaqButton = styled(Button).attrs({ variant: "text", size: "sm", fullWidth: true })<AddFaqButtonProps>(
    ({ theme, disabled }) => css`
        height: auto;
        text-transform: none;
        color: ${disabled ? theme.palette.disabled : theme.palette.primary};
    `,
);
