import { ModalProvider } from "@peersyst/react-components";
import Header from "module/common/component/navigation/Header/Header";
import ScrollToTop from "module/common/component/navigation/ScrollToTop/ScrollToTop";
import { useDashboardRoutes } from "module/dashboard/DashboardRouter";
import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Footer from "module/common/component/navigation/Footer/Footer";
import { config } from "config";
import { useNftRouter } from "module/nft/NftRouter";

const Routes = () => {
    const dashboardRoutes = useDashboardRoutes();
    const nftRoutes = useNftRouter();
    return useRoutes([...dashboardRoutes, ...nftRoutes]);
};

const Router = (): JSX.Element => (
    <BrowserRouter basename={config.publicUrl}>
        <ModalProvider>
            <ScrollToTop />
            <Suspense fallback={<div>Loading</div>}>
                <Header />
                <Routes />
                <Footer />
            </Suspense>
        </ModalProvider>
    </BrowserRouter>
);

export default Router;
