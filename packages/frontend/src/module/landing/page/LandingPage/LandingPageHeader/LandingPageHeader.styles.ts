import styled, { css } from "styled-components";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import { Button, Col, Typography } from "@peersyst/react-components";

export const BaseLandingPageHeader = styled(PageHeader)(
    ({ theme }) => css`
        .main-header {
            position: relative;
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            margin: var(--appbar-height) auto 0;
            max-width: var(--page-max-width);
            align-self: center;
            padding-bottom: 6rem;
            padding-top: 9.25rem;
            background: transparent;
        }
        .ContentHeader {
            padding: 0 15rem;
        }

        ${theme.breakpoints.down("sm")} {
            .ContentHeader {
                padding: 0 10rem;
            }
        }

        ${theme.breakpoints.down("mobile")} {
            .main-header {
                padding-top: 2rem;
            }
            .ContentHeader {
                padding: 0 5rem;
            }
        }
    `,
);

export const BaseLandingPageRoot = styled(Col)(
    ({ theme }) => css`
        .nebula {
            margin: var(--appbar-height) auto 0;
        }
        ${theme.breakpoints.down("mobile")} {
            .nebula {
                height: 8rem;
            }
        }
    `,
);

export const BaseTitle = styled(Typography)(
    ({ theme }) => css`
        font-weight: 800;
        line-height: 4.5rem;
        text-align: center;

        ${theme.breakpoints.down("sm")} {
            font-size: 3rem;
            line-height: 4rem;
        }
        ${theme.breakpoints.down("mobile")} {
            font-size: 2rem;
            line-height: 3rem;
        }
    `,
);

export const BaseDescription = styled(Typography)(
    ({ theme }) => css`
        line-height: 2rem;
        text-align: center;
        color: ${theme.palette.black[40]};
        ${theme.breakpoints.down("sm")} {
            font-size: 1.5rem;
        }
        ${theme.breakpoints.down("mobile")} {
            font-size: 1rem;
            line-height: 1.5rem;
        }
    `,
);

export const BaseButton = styled(Button)(
    ({ theme }) => css`
        background: linear-gradient(265.96deg, #bd00ff -0.17%, #008cff 54.13%, #00f0ff 99.83%);
        border-radius: 6px;
        color: ${theme.palette.black[0]};
        padding: 1.5rem 2rem;
        .Typography {
            text-transform: initial;
        }
        ${theme.breakpoints.down("sm")} {
            .Typography {
                font-size: 1rem;
            }
        }
    `,
);
