import { DashboardRouter } from "module/dashboard/DashboardRouter";
import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

const Router = (): JSX.Element => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div>Loading</div>}>
            <Routes>{DashboardRouter}</Routes>
        </Suspense>
    </BrowserRouter>
);

export default Router;
