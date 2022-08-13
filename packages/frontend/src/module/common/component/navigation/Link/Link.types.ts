import { TypographyProps } from "@peersyst/react-components";

export interface LinkProps extends Omit<TypographyProps, "variant" | "singleLine"> {
    to: string;
    type?: "href" | "router";
    target?: "_blank" | "_self";
    variant?: TypographyProps["variant"];
}
