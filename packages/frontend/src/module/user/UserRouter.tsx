import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum UserRoutes {
    PROFILE = "/user/:address",
}

const ProfilePage = lazy(() => import("./page/ProfilePage"));

export const useUserRoutes = (): RouteObject[] => {
    return [
        {
            path: UserRoutes.PROFILE,
            element: <ProfilePage />,
        },
    ];
};
