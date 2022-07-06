import "styled-components";
import "@peersyst/react-components";
import { Theme } from "@peersyst/react-components";
import "styled-components/cssprop";
import { CSSProp } from "styled-components";

// Custom components theme
declare module "@peersyst/react-components" {}

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
