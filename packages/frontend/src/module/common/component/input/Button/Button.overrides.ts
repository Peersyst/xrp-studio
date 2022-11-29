import "@peersyst/react-components";

declare module "@peersyst/react-components" {
    export interface ButtonVariantOverrides {
        filled: false;
        primary: true;
        secondary: true;
        tertiary: true;
        glass: true;
        rainbow: true;
    }
    export interface ButtonSizeOverrides {
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}
