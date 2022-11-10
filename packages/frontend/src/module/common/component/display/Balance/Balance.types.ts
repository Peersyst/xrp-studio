import { TypographyProps } from "@peersyst/react-components";

export type AppCurrency = "fiat" | "token";

export type BalanceAction = "display" | "add" | "round";

export interface BalanceProps extends Omit<TypographyProps, "children" | "singleLine"> {
    balance: bigint | number | string;
    units?: AppCurrency | string;
    unitsPosition?: "left" | "right";
    action?: BalanceAction;
    options?: Intl.NumberFormatOptions;
    isLoading?: boolean;
}
