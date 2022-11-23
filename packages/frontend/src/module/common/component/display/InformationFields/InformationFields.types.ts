import { ReactNode } from "react";
import { LabelProps, TypographyProps } from "@peersyst/react-components";

export interface InformationField {
    label: string;
    content: ReactNode | undefined;
}

export interface InformationFieldsProps extends Omit<LabelProps, "label" | "children" | "gap"> {
    fields: InformationField[];
    gap?: number | string;
    labelGap?: number | string;
}

export interface InformationFieldLabelProps {
    variant: TypographyProps["variant"];
}
