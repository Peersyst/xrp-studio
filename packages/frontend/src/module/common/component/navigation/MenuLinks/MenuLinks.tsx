import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook/useWallet";
import { APPBAR_TABS } from "../AppBar/AppBarTabs";
import Link from "../Link/Link";
import { MenuLinksRoot } from "./MenuLinks.styles";
import { MenuLinksProps } from "./MenuLinks.types";
import { useLocation } from "react-router-dom";

const MenuLinks = ({ onClick }: MenuLinksProps): JSX.Element => {
    const { isLogged } = useWallet();
    const translate = useTranslate();
    const location = useLocation();

    return (
        <MenuLinksRoot>
            {isLogged ? (
                APPBAR_TABS.map((item) => (
                    <Link type="router" key={item.label} to={item.path} onClick={onClick ? () => onClick() : undefined}>
                        <Typography variant="body1" color={location.pathname.includes(item.path) ? "black.0" : "black.40"} fontWeight={500}>
                            {translate(item.label)}
                        </Typography>
                    </Link>
                ))
            ) : (
                <></>
            )}
        </MenuLinksRoot>
    );
};
export default MenuLinks;
