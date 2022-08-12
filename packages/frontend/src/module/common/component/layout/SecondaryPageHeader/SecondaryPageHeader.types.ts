import { ReactElement } from "react";

export interface SecondaryPageHeaderProps {
    /**
     * Page header title
     */
    title: string | ReactElement;
    /**
     * Page Secondary header optional content
     */
    children?: {
        /**
         * complement: page header top right content
         */
        complement?: ReactElement;
        /**
         * bottomComponent: page header bottom content
         */
        bottomComponent?: ReactElement;
    };
}
