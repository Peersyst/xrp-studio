import styled, { css } from "styled-components";
import { Col, Button } from "@peersyst/react-components";
import { AddPropertyButtonProps, PropertiesInputRootProps } from "module/nft/component/input/PropertiesInput/PropertiesInput.types";

export const PropertiesInputRoot = styled(Col).attrs({ gap: "1rem" })<PropertiesInputRootProps>(
    ({ hasLabel }) => css`
        width: ${hasLabel && "100%"};
    `,
);

// Picked react-components Button instead of custom xrp-studio Button as it fits more accurately into this custom button
export const AddPropertyButton = styled(Button).attrs({ variant: "text", size: "sm", fullWidth: true })<AddPropertyButtonProps>(
    ({ theme, disabled }) => css`
        height: auto;
        text-transform: none;
        color: ${disabled ? theme.palette.disabled : theme.palette.primary};
    `,
);
