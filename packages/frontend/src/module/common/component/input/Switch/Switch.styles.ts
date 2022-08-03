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
            }

            .SwitchTrack {
                background-color: ${theme.palette.black[20]};
                padding: 5px;
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
