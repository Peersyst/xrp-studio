import { StrictMode, Fragment } from "react";
import ReactDOM from "react-dom";
import Providers from "./Providers";
import Router from "./Router";
import "module/api/OpenApiConfig";
import "./locale/i18n";

const Root = process.env.NODE_ENV === "development" ? StrictMode : Fragment;

ReactDOM.render(
    <Root>
        <Providers>
            <Router />
        </Providers>
    </Root>,
    document.getElementById("root"),
);
