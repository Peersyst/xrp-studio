import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";

export interface ActionsPageHeaderProps<T extends string = string> {
    loading?: boolean;
    backPath?: string;
    title: string;
    actions?: ActionButtonProps<T>[];
}
