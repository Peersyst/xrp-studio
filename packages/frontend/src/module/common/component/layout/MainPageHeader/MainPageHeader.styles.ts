import { Col } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { BaseFiltersNames } from "../../input/Filters/Filters.types";
import SearchFilter from "../../input/Filters/SearchFilter/SearchFilter";
import PageHeader from "../PageHeader/PageHeader";

export const MainPageHeaderRoot = styled(PageHeader)(
    ({ theme }) => css`
        .main-header {
            border-bottom: 1px solid ${theme.palette.black[80]};
        }
    `,
);

export const MainPageHeaderWrapper = styled(Col)(
    ({ theme }) => css`
        ${theme.breakpoints.down("mobile")} {
            row-gap: 1.5rem;
        }
    `,
);

export const MainPageHeaderSearchBar = styled(SearchFilter).attrs({ name: BaseFiltersNames.QUERY })(
    ({ theme }) => css`
        width: 18rem;
        ${theme.breakpoints.down("mobile")} {
            width: 100%;
        }
    `,
);
