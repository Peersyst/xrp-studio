import { ModalProvider } from "@peersyst/react-components";
import AppBar from "module/common/component/navigation/AppBar/AppBar";
import ScrollToTop from "module/common/component/navigation/ScrollToTop/ScrollToTop";
import { useDashboardRoutes } from "module/dashboard/DashboardRouter";
import { Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Footer from "module/common/component/navigation/Footer/Footer";
import { config } from "config";
import { useNftRoutes } from "module/nft/NftRouter";
import { useLoad } from "module/common/hook/useLoad";
import { useUserRoutes } from "module/user/UserRouter";
import { useCollectionRoutes } from "module/collection/CollectionRouter";
import { useDropRoutes } from "module/drop/DropRouter";
import { useExploreRoutes } from "module/explore/ExploreRouter";

export enum BaseRoutes {
    HOME = "/",
}

const Routes = () => {
    const dashboardRoutes = useDashboardRoutes();
    const userRoutes = useUserRoutes();
    const nftRoutes = useNftRoutes();
    const collectionRoutes = useCollectionRoutes();
    const dropRoutes = useDropRoutes();
    const exploreRoutes = useExploreRoutes();
    return useRoutes([
        ...dashboardRoutes,
        ...userRoutes,
        ...nftRoutes,
        ...collectionRoutes,
        ...dropRoutes,
        ...exploreRoutes,
        { path: "*", element: <Navigate to={BaseRoutes.HOME} /> },
    ]);
};

const Router = (): JSX.Element => {
    const loading = useLoad();

    return (
        <BrowserRouter basename={config.publicUrl}>
            <ModalProvider>
                <ScrollToTop />
                <Suspense fallback={<div>Loading</div>}>
                    {loading ? (
                        <div>Loading</div>
                    ) : (
                        <>
                            <AppBar />
                            <Routes />
                            <Footer />
                        </>
                    )}
                </Suspense>
            </ModalProvider>
        </BrowserRouter>
    );
};

export default Router;
