import styled, { css } from "styled-components";
import { Tab } from "@peersyst/react-components";
import { ExploreTabProps } from "module/explore/component/layout/ExploreTab/ExploreTab.types";

export const ExploreTab = styled(Tab)<ExploreTabProps>(
    ({ theme, selected }) => css`
        padding: 1.5rem 0;
        color: ${selected ? theme.palette.black[0] : theme.palette.black[30]};
        border-bottom: ${selected ? "2px" : 0} solid ${selected ? theme.palette.blue[50] : theme.palette.background};
    `,
);
