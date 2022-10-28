import styled, { css } from "styled-components";
import { emphasize } from "@peersyst/react-utils";
import { Col } from "@peersyst/react-components";

export const UploadInputPlaceholderRoot = styled(Col).attrs({ alignItems: "center", justifyContent: "center", gap: "7.5%" })(
    ({ theme }) => {
        const light = theme.palette.mode === "light";
        const color = theme.palette.black["85"];
        return css`
            height: 100%;
            width: 100%;
            padding: 1rem;

            background: ${color};
            border-radius: ${theme.borderRadiusLg};
            color: ${theme.palette.black[light ? 40 : 70]};

            overflow: hidden;

            transition: background-color 200ms linear;

            &:hover {
                background: ${emphasize(color, 0.08)};
            }
        `;
    },
);
