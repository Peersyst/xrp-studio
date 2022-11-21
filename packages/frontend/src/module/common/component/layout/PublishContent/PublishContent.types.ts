import { ReactElement } from "react";

export interface PublishContentProps {
    children: {
        cover?: string;
        feedback?: ReactElement;
        footer?: ReactElement;
    };
}
