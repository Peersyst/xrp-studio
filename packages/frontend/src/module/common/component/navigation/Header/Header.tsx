import { image } from "asset";
import styled from "styled-components";
import { AppBar, Toolbar } from "@peersyst/react-components";
import WalletConnected from "module/common/component/navigation/Header/WalletConnected";
import WalletNotConnected from "module/common/component/navigation/Header/WalletNotConnected";

interface HeaderProps {
    className?: string;
}

const HeaderRoot = styled(AppBar).attrs({ position: "fixed" })`
    background-color: black;
    padding-left: 10rem;
`;

const Header = ({ className }: HeaderProps): JSX.Element => {
    const connected = true;
    return (
        <HeaderRoot className={className}>
            <Toolbar style={{ justifyContent: "space-between", width: "100%" }}>
                <img src={image.logo} alt="logo" />
                {connected ? <WalletConnected /> : <WalletNotConnected />}
            </Toolbar>
        </HeaderRoot>
    );
};

export default Header;
