import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import LoggedInRoute from "module/wallet/component/navigation/LoggedInRoute/LoggedInRoute";

export enum DropRoutes {
    DROP_CREATION = "/drops/creation",
    DROP = "/drops/:id",
    MY_DROPS = "/drops/my-drops",
}

const DropCreationPage = lazy(() => import("../drop/page/DropCreationPage/DropCreationPage"));
const DropLandingPage = lazy(() => import("../drop/page/DropLandingPage/DropLandingPage"));
const MyDropsPage = lazy(() => import("../drop/page/MyDropsPage/MyDropsPage"));

export const useDropRoutes = (): RouteObject[] => {
    return [
        {
            path: DropRoutes.DROP_CREATION,
            element: (
                <LoggedInRoute>
                    <DropCreationPage />
                </LoggedInRoute>
            ),
        },
        {
            path: DropRoutes.DROP,
            element: <DropLandingPage />,
        },
        {
            path: DropRoutes.MY_DROPS,
            element: (
                <LoggedInRoute>
                    <MyDropsPage />
                </LoggedInRoute>
            ),
        },
    ];
};
