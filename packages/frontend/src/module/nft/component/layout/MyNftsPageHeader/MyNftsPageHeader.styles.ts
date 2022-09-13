import BasePageHeader from "module/common/component/layout/BasePageHeader/BasePageHeader";
import styled, { css } from "styled-components";

export const MyNftsPageHeaderRoot = styled(BasePageHeader)(
    ({ theme }) => css`
        .my-nfts-search {
            ${theme.breakpoints.down("mobile")} {
                width: 100%;
            }
        }
    `,
);
