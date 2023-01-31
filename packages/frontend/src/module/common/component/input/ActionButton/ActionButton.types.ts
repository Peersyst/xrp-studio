import { ButtonProps } from "module/common/component/input/Button/Button.types";

export interface ActionButtonProps<T extends string = string> extends Omit<ButtonProps, "onClick" | "action" | "children"> {
    label: string;
    action: T;
    popover?: {
        enabled: boolean;
        message: string;
    };
}
