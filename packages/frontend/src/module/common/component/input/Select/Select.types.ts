import { SelectProps as BaseSelectProps } from "@peersyst/react-components";

export interface SelectRootProps {
    /**
     * Appearance of the select
     */
    appearance?: "primary" | "outlined";
    /**
     * Size of the select
     */
    size?: "lg" | "md";
}

export type SelectProps<T> = BaseSelectProps<T> & SelectRootProps;
