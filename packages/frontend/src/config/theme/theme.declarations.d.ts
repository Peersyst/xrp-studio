import "styled-components";
import "@peersyst/react-components";
import { Theme } from "@peersyst/react-components";
import "styled-components/cssprop";
import { CSSProp } from "styled-components";

// Custom components theme
declare module "@peersyst/react-components" {
    export interface ThemeZIndex {
        filters: number;
    }

    export interface Theme {
        borderRadiusMd: string;
        borderRadiusLg: string;
    }

    export interface CreateTheme {
        borderRadiusMd: string;
        borderRadiusLg: string;
    }
    export interface ThemePalette {
        gray: {
            90: string;
            "2.5": string;
        };
        blue: {
            "2.5": string;
            5: string;
            10: string;
            15: string;
            20: string;
            30: string;
            40: string;
            50: string;
            55: string;
            60: string;
            70: string;
            80: string;
            90: string;
        };
        black: {
            "2.5": string;
            5: string;
            10: string;
            15: string;
            20: string;
            30: string;
            40: string;
            50: string;
            60: string;
            70: string;
            75: string;
            80: string;
            85: string;
            90: string;
            100: string;
            0: string;
        };
    }

    export interface ThemeBreakpointValues {
        nftsGrid: {
            xl: number;
            sm: number;
            xs: number;
            xxs: number;
        };
    }
}

// Type styled components theme with our components theme
declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}

// Use css prop in components
declare module "react" {
    export interface Attributes {
        css?: CSSProp<Theme>;
    }
}
