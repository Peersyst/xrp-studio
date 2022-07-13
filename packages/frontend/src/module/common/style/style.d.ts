import "styled-components";
import "@peersyst/react-components";
import { Theme } from "@peersyst/react-components";
import "styled-components/cssprop";
import { CSSProp } from "styled-components";

// Custom components theme
declare module "@peersyst/react-components" {
    export interface ThemeBreakpointValues {
        nftHeaderFilters: number;
        nftsGrid: {
            md: number;
            sm: number;
            xs: number;
            xxs: number;
            mobile: number;
            mini: number;
        };
        nftsGridWithFilters: {
            md: number;
            sm: number;
            xs: number;
            xxs: number;
            mini: number;
        };
        detailsPage: number;
    }
}

// Type styled components theme with our components theme
declare module "styled-components" {
    export type DefaultTheme = Theme;
}

// Use css prop in components
declare module "react" {
    export interface Attributes {
        css?: CSSProp<Theme>;
    }
}
