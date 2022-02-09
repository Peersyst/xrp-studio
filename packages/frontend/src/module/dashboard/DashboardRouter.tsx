import { lazy } from "react";
import { Route } from "react-router-dom";

export enum DashboardRoutes {
    MAIN = "/",
}

const DashboardPage = lazy(() => import("./DashboardPage"));

export const DashboardRouter = (
    <>
        <Route path={DashboardRoutes.MAIN} element={<DashboardPage />} />
    </>
);
