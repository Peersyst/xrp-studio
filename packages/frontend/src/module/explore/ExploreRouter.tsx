import { RouteObject } from "react-router-dom";
import ExplorePage from "module/explore/page/ExplorePage/ExplorePage";

export enum ExploreRoutes {
    MAIN = "/explore",
    TRENDING = "/explore/trending",
    COLLECTIONS = "/explore/collections",
    NFTS = "/explore/nfts",
}

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
            path: ExploreRoutes.COLLECTIONS,
            element: <ExplorePage />,
        },
        {
            path: ExploreRoutes.NFTS,
            element: <ExplorePage />,
        },
    ];
};
