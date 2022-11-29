import { ReactElement } from "react";

export interface PublishResultProps {
    title: string;
    type: "success" | "error";
    children: ReactElement;
}
