import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook/useWallet";
import { APPBAR_TABS } from "../AppBar/AppBarTabs";
import ConditionalLink from "../ConditionalLink/ConditionalLink";
import { MenuLinksProps } from "./MenuLinks.types";

const MenuLinks = ({ onClick }: MenuLinksProps): JSX.Element => {
    const { isLogged } = useWallet();
    const translate = useTranslate();

    return (
        <>
            {isLogged ? (
                APPBAR_TABS.map((item) => (
                    <ConditionalLink key={item.label} condition={isLogged} to={item.path} onClick={onClick ? () => onClick() : undefined}>
                        <Typography variant="body1" color={location.pathname.includes(item.path) ? "black.0" : "black.40"} fontWeight={500}>
                            {translate(item.label)}
                        </Typography>
                    </ConditionalLink>
                ))
            ) : (
                <></>
            )}
        </>
    );
};
export default MenuLinks;
