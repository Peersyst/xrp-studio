import { image } from "asset";
import styled from "styled-components";
import { AppBar, Toolbar } from "@peersyst/react-components";

interface HeaderProps {
    className?: string;
}

const HeaderRoot = styled(AppBar).attrs({ position: "fixed" })`
    background-color: red;
`;

const Header = ({ className }: HeaderProps): JSX.Element => (
    <HeaderRoot className={className}>
        <Toolbar>
            <img src={image.logo} alt="logo" />
        </Toolbar>
    </HeaderRoot>
);

export default Header;
