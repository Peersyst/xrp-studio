import { image } from "asset";
import styled from "styled-components";
import { AppBar, Row, Toolbar } from "@peersyst/react-components";
import WalletConnected from "module/common/component/navigation/Header/WalletConnected/WalletConnected";
import WalletNotConnected from "module/common/component/navigation/Header/WalletNotConnected/WalletNotConnected";

interface HeaderProps {
    className?: string;
}

const HeaderRoot = styled(AppBar).attrs({ position: "fixed" })`
    background-color: black;
    padding-left: 10rem;
`;

const Header = ({ className }: HeaderProps): JSX.Element => {
    const connected = false;
    return (
        <HeaderRoot className={className}>
            <Toolbar>
                <Row style={{ justifyContent: "space-between", width: "100%" }}>
                    <img src={image.logo} alt="logo" />
                    {connected ? <WalletConnected /> : <WalletNotConnected />}
                </Row>
            </Toolbar>
        </HeaderRoot>
    );
};

export default Header;
