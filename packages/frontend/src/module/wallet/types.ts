export interface Wallet {
    isLogged: boolean;
    address: string | undefined;
    active: boolean;
}
export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp";
