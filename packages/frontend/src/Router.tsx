import { ModalProvider } from "@peersyst/react-components";
import Header from "module/common/component/navigation/Header/Header";
import ScrollToTop from "module/common/component/navigation/ScrollToTop/ScrollToTop";
import { DashboardRouter } from "module/dashboard/DashboardRouter";
import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Footer from "module/common/component/navigation/Footer/Footer";

const Router = (): JSX.Element => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ModalProvider>
            <ScrollToTop />
            <Suspense fallback={<div>Loading</div>}>
                <Header />
                <Routes>{DashboardRouter}</Routes>
                <Footer />
            </Suspense>
        </ModalProvider>
    </BrowserRouter>
);

export default Router;
