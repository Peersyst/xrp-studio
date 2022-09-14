import { IconButton, Upload } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import Card from "../../surface/Card/Card";

export const FileInputCard = styled(Card)(
    ({ theme }) => css`
        position: relative;
        padding: 2rem;
        height: 31rem;
        width: 100%;
        max-width: 100%;
        flex: 1;
        border-radius: ${theme.borderRadiusLg};
        ${theme.breakpoints.down("mobile")} {
            padding: 2rem 1rem;
            height: 22rem;
        }
    `,
);

export const FileInputRoot = styled(Upload)(
    ({ theme }) => css`
        height: 100%;
        ${theme.breakpoints.down("mobile")} {
            .placeholder-col {
                row-gap: 2rem;
            }
        }
    `,
);

export const RemoveFileIcon = styled(IconButton)(
    ({ theme }) => css`
        position: absolute;
        cursor: pointer;
        top: 1rem;
        right: 1rem;
        color: ${theme.palette.black[0]};
    `,
);
