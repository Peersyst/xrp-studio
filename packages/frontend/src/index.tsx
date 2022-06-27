import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { loadLocalization } from "locale";
import Providers from "./Providers";
import Router from "./Router";
import "module/api/OpenApiConfig";
import "./locale/i18n";
loadLocalization();

ReactDOM.render(
    <StrictMode>
        <Providers>
            <Router />
        </Providers>
    </StrictMode>,
    document.getElementById("root"),
);
