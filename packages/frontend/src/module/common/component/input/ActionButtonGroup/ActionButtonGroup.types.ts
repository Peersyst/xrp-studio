import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";

export interface ActionButtonGroupProps<T extends string = string> {
    actions: ActionButtonProps<T>[];
}
