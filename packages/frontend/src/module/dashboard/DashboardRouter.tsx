import { lazy } from "react";
import { RouteObject } from "react-router-dom";

export enum DashboardRoutes {
    MAIN = "/",
}

const DashboardPage = lazy(() => import("./DashboardPage"));

export const useDashboardRoutes = (): RouteObject[] => {
    return [
        {
            path: DashboardRoutes.MAIN,
            element: <DashboardPage />,
        },
    ];
};
