import { Col, IconButton } from "@peersyst/react-components";
import { emphasize } from "@peersyst/react-utils";
import styled, { css } from "styled-components";

const hoverStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    const color = theme.palette.black[light ? "80" : "85"];
    return css`
        background: ${emphasize(color, 0.08)};
    `;
});

export const FileInputRoot = styled(Col)(
    ({ theme }) => css`
        height: 31rem;
        position: relative;
        max-width: 100%;
        flex: 1;
        .FormControl {
            height: 100%;
        }
        .Upload.Drag {
            .file-input-wrapper {
                ${hoverStyles}
            }
        }
        ${theme.breakpoints.down("mobile")} {
            height: 22rem;
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

export const greyStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        color: ${theme.palette.black[light ? 40 : 70]};
    `;
});

export const FileInputBaseIcon = styled.div(
    ({ theme }) => css`
        ${greyStyles};
        font-size: 9rem;
        ${theme.breakpoints.down("mobile")} {
            font-size: 5.5rem;
        }
    `,
);
