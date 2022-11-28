import styled, { css } from "styled-components";
import { Tab } from "@peersyst/react-components";
import { ExploreTabProps } from "module/explore/component/ExploreTab/ExploreTab.types";

export const ExploreTab = styled(Tab)<ExploreTabProps>(
    ({ theme, selected }) => css`
        padding: 1.5rem 0;
        border-bottom: ${selected ? "2px" : 0} solid ${selected ? theme.palette.blue[50] : theme.palette.background};
    `,
);
