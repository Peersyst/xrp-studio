import { IconButtonProps } from "@peersyst/react-components";

export interface ArrowButtonProps extends Omit<IconButtonProps, "children"> {
    direction: "left" | "right";
}
