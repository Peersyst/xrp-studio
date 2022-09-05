import { ReactNode } from "react";
import { SecondaryPageHeaderProps } from "../SecondaryPageHeader/SecondaryPageHeader.types";

export type SecondaryPageChildren = SecondaryPageHeaderProps["children"] & {
    /**
     * Secondaty page content
     */
    content: ReactNode;
};

export interface SecondaryPageProps extends Omit<SecondaryPageHeaderProps, "children"> {
    /**
     * Secondary page content
     */
    children: SecondaryPageChildren;
}
