import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import styled, { css } from "styled-components";

export const MyNftsPageHeaderRoot = styled(MainPageHeader)(
    ({ theme }) => css`
        .my-nfts-search {
            ${theme.breakpoints.down("mobile")} {
                width: 100%;
            }
        }
    `,
);
