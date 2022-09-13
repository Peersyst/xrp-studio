import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import styled, { css } from "styled-components";

export const MyNftsPageHeaderFooterRoot = styled(SearchBar)(
    ({ theme }) => css`
        width: 18rem;
        ${theme.breakpoints.down("mobile")} {
            width: 100%;
        }
    `,
);
