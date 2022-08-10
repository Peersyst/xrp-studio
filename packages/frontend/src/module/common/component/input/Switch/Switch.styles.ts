import { Switch } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { SwitchProps } from "@peersyst/react-components";

export const SwitchRoot = styled(Switch)<SwitchProps>(
    ({ theme }) => css`
        .Switch {
            height: 1.5rem;
            width: 2.375rem;

            .SwitchThumb {
                background-color: ${theme.palette.black[100]};
                box-shadow: none;
                width: 0.875rem;
                height: 0.875rem;
            }

            .SwitchTrack {
                background-color: ${theme.palette.black[20]};
                padding: 0.313rem;
                box-shadow: none;
            }

            &.Checked {
                .SwitchTrack {
                    background-color: ${theme.palette.primary};
                }
            }
        }
    `,
);
