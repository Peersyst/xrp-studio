import { ModalProvider } from "@peersyst/react-components";
import AppBar from "module/common/component/navigation/AppBar/AppBar";
import ScrollToTop from "module/common/component/navigation/ScrollToTop/ScrollToTop";
import { useDashboardRoutes } from "module/dashboard/DashboardRouter";
import { Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Footer from "module/common/component/navigation/Footer/Footer";
import { config } from "config";
import { useNftRouter } from "module/nft/NftRouter";
import { useLoad } from "module/common/hook/useLoad";

const Routes = () => {
    const dashboardRoutes = useDashboardRoutes();
    const nftRoutes = useNftRouter();
    return useRoutes([...dashboardRoutes, ...nftRoutes, { path: "*", element: <Navigate to="/" /> }]);
};

const Router = (): JSX.Element => {
    useLoad();

    return (
        <BrowserRouter basename={config.publicUrl}>
            <ModalProvider>
                <ScrollToTop />
                <Suspense fallback={<div>Loading</div>}>
                    <AppBar />
                    <Routes />
                    <Footer />
                </Suspense>
            </ModalProvider>
        </BrowserRouter>
    );
};

export default Router;
