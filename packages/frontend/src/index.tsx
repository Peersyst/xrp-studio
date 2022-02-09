import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { loadLocalization } from "locale";
import Providers from "./Providers";
import Router from "./Router";
import { useLoad } from "module/common/query/useLoad";

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();
    return <>{loading ? "Loading app" : <Router />}</>;
};

ReactDOM.render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>,
    document.getElementById("root"),
);
