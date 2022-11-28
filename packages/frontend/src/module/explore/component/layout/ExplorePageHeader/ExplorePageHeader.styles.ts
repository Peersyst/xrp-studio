import styled, { css } from "styled-components";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";

export const ExplorePageHeaderRoot = styled(MainPageHeader)(
    () => css`
        .main-header {
            padding-bottom: 0;
        }
    `,
);
