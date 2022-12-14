import { TypographyProps } from "@peersyst/react-components";

export interface UsernameProps extends Omit<TypographyProps, "children" | "singleLine" | "textAlign" | "variant"> {
    variant: TypographyProps["variant"];
    name: string | undefined;
    verified: boolean | undefined;
    loading?: boolean;
}

export interface UsernameRootProps {
    variant: TypographyProps["variant"];
}
