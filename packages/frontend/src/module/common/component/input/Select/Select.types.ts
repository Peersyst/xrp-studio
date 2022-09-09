import { SelectProps as BaseSelectProps } from "@peersyst/react-components";

export type SelectProps<T> = BaseSelectProps<T> & {
    /**
     * Variant of the select
     */
    variant?: "outlined" | "filled";
    /**
     * Size of the select
     */
    size?: "lg" | "md";
};
