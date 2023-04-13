import { ReactElement, ReactNode } from "react";
import { ModalProps } from "module/common/component/feedback/Modal/Modal.types";
import { ButtonVariant } from "@peersyst/react-components";

export type ActionFn = (actions: { back(): void; next(): void; close(): void }) => void;

export type Action = "back" | "next" | "close" | ActionFn;

export interface ActionTabAction {
    action: Action;
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonVariant;
}

export interface ActionTab {
    content: ReactElement;
    actions: ActionTabAction[];
}

export interface ActionModalProps extends Omit<ModalProps, "size" | "gap"> {
    direction?: "row" | "column";
    children: {
        tabs: ActionTab[];
        footer?: ReactNode;
    };
}
