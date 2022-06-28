import { PropsWithChildren } from "react";
import { theme } from "module/common/style/theme";
import { ThemeProvider } from "@peersyst/react-components";
import { GlobalStyles } from "./GlobalStyles";

const StylesProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
    </ThemeProvider>
);

export default StylesProvider;
