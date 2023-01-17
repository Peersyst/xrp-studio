import { ModalProvider } from "@peersyst/react-components";
import AppBar from "module/common/component/navigation/AppBar/AppBar";
import ScrollToTop from "module/common/component/navigation/ScrollToTop/ScrollToTop";
import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Footer from "module/common/component/navigation/Footer/Footer";
import { config } from "config";
import { useNftRoutes } from "module/nft/NftRouter";
import { useLoad } from "module/common/hook/useLoad";
import { useUserRoutes } from "module/user/UserRouter";
import { useCollectionRoutes } from "module/collection/router/CollectionRouter";
import { useDropRoutes } from "module/drop/DropRouter";
import { useExploreRoutes } from "module/explore/ExploreRouter";
import { useLandingRoutes } from "module/landing/LandingRouter";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import LoadingLogo from "module/common/component/layout/LoadingLogo/LoadingLogo";

const Routes = () => {
    const userRoutes = useUserRoutes();
    const nftRoutes = useNftRoutes();
    const collectionRoutes = useCollectionRoutes();
    const dropRoutes = useDropRoutes();
    const landingRoutes = useLandingRoutes();
    const exploreRoutes = useExploreRoutes();
    return useRoutes([
        ...userRoutes,
        ...nftRoutes,
        ...collectionRoutes,
        ...dropRoutes,
        ...exploreRoutes,
        ...landingRoutes,
        { path: "*", element: <NotFoundPage /> },
    ]);
};

const Router = (): JSX.Element => {
    const loading = useLoad();

    return (
        <BrowserRouter basename={config.publicUrl}>
            <ModalProvider>
                <ScrollToTop />
                <Suspense fallback={<LoadingLogo />}>
                    {loading ? (
                        <LoadingLogo />
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
