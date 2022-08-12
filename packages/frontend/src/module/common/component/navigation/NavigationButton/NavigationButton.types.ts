import { ButtonProps } from "@peersyst/react-components";

export type Navigation = "back" | "next";

export interface NavigationButtonProps extends ButtonProps {
    navigate: Navigation;
}
