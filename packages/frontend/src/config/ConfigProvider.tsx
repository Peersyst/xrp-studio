import { ReactNode } from "react";
import { GlobalStyles } from "./theme/GlobalStyles";
import config from "./config";
import { ConfigProvider as GenesysConfigProvider } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { StyleSheetManager } from "styled-components";

export interface ConfigProviderProps {
    children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
    const translate = useTranslate("error");

    return (
        <GenesysConfigProvider config={{ ...config, translate }}>
            <StyleSheetManager target={document.head}>
                <GlobalStyles />
            </StyleSheetManager>
            {children}
        </GenesysConfigProvider>
    );
};

export default ConfigProvider;
