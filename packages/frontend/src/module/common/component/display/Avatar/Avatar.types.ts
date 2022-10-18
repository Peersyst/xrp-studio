import { CSSProperties } from "react";

export type AvatarSize = "xl" | "lg" | "md" | "sm";

export interface AvatarProps {
    img: string | undefined;
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
