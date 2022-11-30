import { IconButtonProps } from "@peersyst/react-components";

export interface ArrowButtonProps extends Omit<IconButtonProps, "children" | "size"> {
    direction: "left" | "right";
    size?: "lg" | "md" | "sm";
    path?: string;
}
