import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Providers from "./Providers";
import Router from "./Router";
import "module/api/OpenApiConfig";
import "./locale/i18n";

ReactDOM.render(
    <StrictMode>
        <Providers>
            <Router />
        </Providers>
    </StrictMode>,
    document.getElementById("root"),
);
