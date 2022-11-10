import { IconButtonProps } from "@peersyst/react-components";

export interface ThemeButtonProps extends Omit<IconButtonProps, "children"> {
    size?: "md" | "sm";
}
