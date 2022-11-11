import useWallet from "module/wallet/component/hooks/useWallet";
import { PropsWithChildren } from "react";
import ProtectedRoute from "module/common/component/navigation/ProtectedRoute/ProtectedRoute";

const LoggedInRoute = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const { isLogged } = useWallet();

    return <ProtectedRoute isAllowed={isLogged}>{children}</ProtectedRoute>;
};

export default LoggedInRoute;
