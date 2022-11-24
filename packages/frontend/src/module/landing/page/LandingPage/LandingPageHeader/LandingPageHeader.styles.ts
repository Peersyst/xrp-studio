import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

export const LandingPageHeaderRoot = styled(Col).attrs({ alignItems: "center" })(
    ({ theme }) => css`
        margin: var(--appbar-height) 0 0;
        height: 40rem;
        padding: 9.25rem 2rem 0;
        position: relative;
        ${theme.breakpoints.down("md")} {
            .title {
                ${theme.typography.h3.style};
                line-height: 2.625rem;
            }
            .subtitle {
                ${theme.typography.h5.style};
            }
        }
    `,
);

export const BaseButton = styled(Button)(
    () => css`
        background: linear-gradient(265.96deg, #bd00ff -0.17%, #008cff 54.13%, #00f0ff 99.83%);
        border: unset;
    `,
);
