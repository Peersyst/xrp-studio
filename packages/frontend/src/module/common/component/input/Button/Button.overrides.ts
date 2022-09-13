import "@peersyst/react-components";

declare module "@peersyst/react-components" {
    export interface ButtonVariantOverrides {
        filled: false;
        primary: true;
        secondary: true;
    }
}
