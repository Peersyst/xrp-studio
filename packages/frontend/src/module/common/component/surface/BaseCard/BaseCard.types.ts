import { ReactNode } from "react";

export interface BaseCardProps {
    cover: ReactNode;
    title: string;
    loading: boolean;
    children?: ReactNode;
}
