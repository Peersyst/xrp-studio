import { ConfigProvider as GenesysConfigProvider } from "@peersyst/react-components";
import { FC } from "react";
import config from "./config";
import { GlobalStyles } from "./theme/GlobalStyles";
import useTranslate from "module/common/hook/useTranslate";

const ConfigProvider: FC = ({ children }) => {
    const translate = useTranslate();

    return (
        <GenesysConfigProvider config={{ ...config, translate }}>
            <GlobalStyles />
            {children}
        </GenesysConfigProvider>
    );
};

export default ConfigProvider;
