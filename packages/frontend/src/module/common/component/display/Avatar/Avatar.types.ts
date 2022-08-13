import { CSSProperties } from "react";

export type AvatarSize = "lg" | "md" | "sm";

export interface AvatarProps {
    img: string;
    alt: string;
    size?: AvatarSize;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface AvatarSizeParams {
    width: number;
    height: number;
    d: string;
    strokeWidth?: number;
}
