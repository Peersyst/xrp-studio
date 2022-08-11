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
`;

const Header = ({ className }: HeaderProps): JSX.Element => {
    const connected = false;
    return (
        <HeaderRoot className={className}>
            <Toolbar style={{ paddingLeft: "10rem", justifyContent: "space-between" }}>
                <img src={image.logo} alt="logo" />
                {connected ? <WalletConnected /> : <WalletNotConnected />}
            </Toolbar>
        </HeaderRoot>
    );
};

export default Header;
