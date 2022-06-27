import { PropsWithChildren } from "react";
import { createDefaultTheme } from "module/common/style/theme";
import { ThemeProvider } from "@peersyst/react-components";
import { GlobalStyles } from "./GlobalStyles";
import { useTranslation } from "react-i18next";

const StylesProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const { t } = useTranslation();
    const theme = createDefaultTheme(t);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    );
};

export default StylesProvider;
