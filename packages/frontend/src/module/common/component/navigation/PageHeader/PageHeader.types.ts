import { ReactElement } from "react";

export interface PageHeaderProps {
    /**
     * Page header title
     */
    title: string;
    /**
     * Page header top right content
     */
    complement?: ReactElement;
    /**
     * Page header bottom content
     */
    bottomComponent?: ReactElement;
}
