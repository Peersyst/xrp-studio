import styled, { css } from "styled-components";
import BaseEditableImage from "../EditableImage/EditableImage";

export const EditableAvatarRoot = styled(BaseEditableImage)(
    () => css`
        display: flex;
        align-items: center;
    `,
);
