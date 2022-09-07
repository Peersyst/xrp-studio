import { ReactElement } from "react";

export interface SecondaryPageHeaderChildren {
    /**
     * complement: page header top right content
     */
    complement?: ReactElement;
    /**
     * bottomComponent: page header bottom content
     */
    bottomComponent?: ReactElement;
}

export interface SecondaryPageHeaderProps {
    /**
     * Page header title
     */
    title: string | ReactElement;
    /**
     * Page Secondary header optional content
     */
    children?: SecondaryPageHeaderChildren;
}
