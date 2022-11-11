import { PropsWithChildren } from "react";
import ProtectedRoute from "module/common/component/navigation/ProtectedRoute/ProtectedRoute";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import useWallet from "module/wallet/hook/useWallet";

const LoggedInRoute = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const { isLogged } = useWallet();

    return (
        <ProtectedRoute isAllowed={isLogged} redirectPath={DashboardRoutes.MAIN}>
            {children}
        </ProtectedRoute>
    );
};

export default LoggedInRoute;
