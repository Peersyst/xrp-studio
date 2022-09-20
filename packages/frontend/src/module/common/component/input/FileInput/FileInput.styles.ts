import { Col, IconButton, Upload } from "@peersyst/react-components";
import { emphasize } from "@peersyst/react-utils";
import styled, { css } from "styled-components";

export const FileInputRoot = styled(Col)(
    ({ theme }) => css`
        height: 31rem;
        position: relative;
        max-width: 100%;
        flex: 1;
        .FormControl {
            height: 100%;
        }
        ${theme.breakpoints.down("mobile")} {
            height: 22rem;
        }
    `,
);

const hoverStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    const color = theme.palette.black[light ? "80" : "85"];
    return css`
        background: ${emphasize(color, 0.08)};
    `;
});

export const FileUpload = styled(Upload)(
    () => css`
        .Drag {
            .file-input-wrapper {
                ${hoverStyles}
            }
        }
    `,
);

export const FileInputWrapper = styled(Col).attrs({ alignItems: "center", justifyContent: "center", gap: "2.5rem" })(({ theme }) => {
    const light = theme.palette.mode === "light";
    const color = theme.palette.black[light ? "80" : "85"];
    return css`
        height: 100%;
        padding: 0;
        max-width: 100%;
        flex: 1;
        border-radius: ${theme.borderRadiusLg};
        transition: background-color 200ms linear;
        background: ${color};
        &:hover {
            ${hoverStyles}
        }
        ${theme.breakpoints.down("mobile")} {
            row-gap: 2rem;
        }
    `;
});

export const RemoveFileIcon = styled(IconButton)(
    ({ theme }) => css`
        position: absolute;
        cursor: pointer;
        top: 1rem;
        right: 1rem;
        color: ${theme.palette.black[0]};
    `,
);
