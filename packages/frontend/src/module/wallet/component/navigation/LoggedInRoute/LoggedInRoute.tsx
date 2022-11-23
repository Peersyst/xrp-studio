import { PropsWithChildren } from "react";
import ProtectedRoute from "module/common/component/navigation/ProtectedRoute/ProtectedRoute";
import useWallet from "module/wallet/hook/useWallet";
import { LandingRoutes } from "module/landing/LandingRouter";

const LoggedInRoute = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const { isLogged } = useWallet();

    return (
        <ProtectedRoute isAllowed={isLogged} redirectPath={LandingRoutes.HOME}>
            {children}
        </ProtectedRoute>
    );
};

export default LoggedInRoute;
