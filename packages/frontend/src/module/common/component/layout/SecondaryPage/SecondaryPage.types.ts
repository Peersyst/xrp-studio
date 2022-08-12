import { ReactNode } from "react";
import { SecondaryPageHeaderProps } from "../SecondaryPageHeader/SecondaryPageHeader.types";

export interface SecondaryPageProps extends SecondaryPageHeaderProps {
    /**
     * Secondary page content
     */
    children: ReactNode;
}
