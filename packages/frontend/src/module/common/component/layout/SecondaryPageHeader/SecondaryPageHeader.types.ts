import { ReactElement } from "react";

export interface SecondaryPageHeaderProps {
    /**
     * Page header title
     */
    title: string | ReactElement;
    /**
     * Page header top right content
     */
    complement?: ReactElement;
    /**
     * Page header bottom content
     */
    bottomComponent?: ReactElement;
}
