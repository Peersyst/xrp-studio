import styled, { css } from "styled-components";
import { Col, Button } from "@peersyst/react-components";
import { FaqInputRootProps } from "./FaqInput.types";
import { deemphasize } from "@peersyst/react-utils";

export const FaqsInputRoot = styled(Col).attrs({ gap: "1rem", alignItems: "center" })<FaqInputRootProps>(
    ({ hasLabel }) => css`
        width: ${hasLabel && "100%"};
    `,
);

export const DeleteFaqButton = styled(Button)(
    ({ theme }) => css`
        color: ${theme.palette.status.error};
        padding: 0;
        text-transform: none;
        &:hover {
            color: ${deemphasize(theme.palette.status.error, 0.1)};
        }
    `,
);
