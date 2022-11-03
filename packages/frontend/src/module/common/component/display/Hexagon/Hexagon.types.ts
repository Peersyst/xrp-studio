import { CSSProperties, ReactNode } from "react";

export type HexagonSize = "xl" | "lg" | "md" | "sm";

export interface HexagonProps {
    size?: HexagonSize;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export type ExtendableHexagonProps = Omit<HexagonProps, "children">;

export interface HexagonSizeParams {
    width: number;
    height: number;
    d: string;
    strokeWidth?: number;
}
