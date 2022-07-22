import { ReactNode } from "react";

export interface BaseCardProps {
    cover: ReactNode;
    title: string;
    note: string;
    to: string;
    loading: boolean;
    children?: ReactNode;
}
