import { ReactNode } from "react";
import { SecondaryPageHeaderProps } from "../SecondaryPageHeader/SecondaryPageHeader.types";

export interface SecondaryPageProps extends Omit<SecondaryPageHeaderProps, "children"> {
    /**
     * Secondary page content
     */
    children: SecondaryPageHeaderProps["children"] & {
        /**
         * Secondaty page content
         */
        content: ReactNode;
    };
}
