import { Col } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const LandingPageHowWorkSectionRoot = styled(Col).attrs({ alignItems: "center" })(
    ({ theme }) => css`
        position: relative;
        overflow: hidden;
        padding: 5.5rem 0;
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
