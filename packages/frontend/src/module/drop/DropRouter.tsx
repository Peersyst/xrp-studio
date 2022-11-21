import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import LoggedInRoute from "module/wallet/component/navigation/LoggedInRoute/LoggedInRoute";

export enum DropRoutes {
    DROP_CREATION = "/drop/creation",
}

const DropCreationPage = lazy(() => import("../drop/page/DropCreationPage/DropCreationPage"));

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
    ];
};
