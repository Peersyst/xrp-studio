import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum LandingRoutes {
    HOME = "/",
}

const LandingPage = lazy(() => import("../landing/page/LandingPage/LandingPage"));

export const useLandingRoutes = (): RouteObject[] => {
    return [
        {
            path: LandingRoutes.HOME,
            element: <LandingPage />,
        },
    ];
};
