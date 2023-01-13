import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import Providers from "./Providers";
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
