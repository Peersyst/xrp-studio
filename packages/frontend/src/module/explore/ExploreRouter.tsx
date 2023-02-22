import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum ExploreRoutes {
    MAIN = "/explore",
    TRENDING = "/explore/trending",
    DROPS = "/explore/drops",
    COLLECTIONS = "/explore/collections",
    NFTS = "/explore/nfts",
}

const ExplorePage = lazy(() => import("./page/ExplorePage/ExplorePage"));

export const useExploreRoutes = (): RouteObject[] => {
    return [
        {
            path: ExploreRoutes.MAIN,
            element: <ExplorePage />,
        },
        {
            path: ExploreRoutes.TRENDING,
            element: <ExplorePage />,
        },
        {
            path: ExploreRoutes.DROPS,
            element: <ExplorePage />,
        },
        {
            path: ExploreRoutes.COLLECTIONS,
            element: <ExplorePage />,
        },
        {
            path: ExploreRoutes.NFTS,
            element: <ExplorePage />,
        },
    ];
};
