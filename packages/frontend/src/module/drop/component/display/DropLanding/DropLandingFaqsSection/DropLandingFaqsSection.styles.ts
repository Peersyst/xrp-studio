import styled, { css } from "styled-components";
import { DropLandingSection } from "module/drop/component/display/DropLanding/DropLanding.styles";

export const DropLandingFaqsSectionRoot = styled(DropLandingSection)(
    ({ theme }) => css`
        .Expandable {
            border: 1px solid ${theme.palette.black[80]};
            padding: 1.5rem 2rem;
            border-radius: ${theme.borderRadiusLg};
            .ExpandableDisplay {
                border-bottom: none;
                .Icon {
                    fontsize: 0.75rem;
                }
            }
        }
    `,
);
