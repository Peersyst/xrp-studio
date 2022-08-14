import { Row, Toolbar } from "@peersyst/react-components";
import { AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";
import Wallet from "module/wallet/component/core/Wallet/Wallet";

const AppBar = (): JSX.Element => (
    <AppBarRoot>
        <Toolbar>
            <Row flex={1} alignItems="center" justifyContent="space-between">
                <Logo />
                <Wallet />
            </Row>
        </Toolbar>
    </AppBarRoot>
);

export default AppBar;
