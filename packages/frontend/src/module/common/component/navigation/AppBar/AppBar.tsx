import { Toolbar } from "@peersyst/react-components";
import { AppBarRoot } from "./AppBar.styles";
import Logo from "module/common/component/display/Logo/Logo";

const AppBar = (): JSX.Element => (
    <AppBarRoot>
        <Toolbar>
            <Logo />
        </Toolbar>
    </AppBarRoot>
);

export default AppBar;
