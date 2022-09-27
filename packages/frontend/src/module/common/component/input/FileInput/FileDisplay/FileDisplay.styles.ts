import styled, { css } from "styled-components";
import { FileInputBaseIcon } from "../FileInput.styles";

export const FileDisplayIcon = styled(FileInputBaseIcon)(
    ({ theme }) => css`
        color: ${theme.palette.black["30"]};
    `,
);
