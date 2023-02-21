import styled, { css } from "styled-components";
import { DropLandingSection } from "module/drop/component/display/DropLanding/DropLanding.styles";

export const DropLandingFaqsSectionRoot = styled(DropLandingSection)(
    ({ theme }) => css`
        .Expandable {
            border: 1px solid ${theme.palette.text};
            border-radius: ${theme.borderRadiusLg};
            padding: 0;

            .ExpandableDisplay {
                padding: 1.5rem 2rem;
                border-bottom: none;
                .Icon {
                    font-size: 0.75rem;
                }
            }

            .ExpandableContent {
                padding: 0 2rem 1.5rem;
            }
        }
    `,
);
