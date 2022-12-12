import { createDrawer, DrawerProps, Toolbar, useDrawer } from "@peersyst/react-components";
import useIsMobile from "module/common/hook/useIsMobile";
import { HeaderMenuLinksWrapper, HeaderMenuRoot } from "./HeaderMenu.styles";
import MenuLinks from "../MenuLinks/MenuLinks";

const HeaderMenu = createDrawer(({ ...drawerProps }: Omit<DrawerProps, "children">) => {
    const { hideDrawer } = useDrawer();
    const isMobile = useIsMobile();

    return (
        <HeaderMenuRoot position="top" elevation={6} BackdropProps={{ transparent: true, style: { zIndex: 1 } }} {...drawerProps}>
            <Toolbar />
            <HeaderMenuLinksWrapper>
                {isMobile ? (
                    <>
                        <MenuLinks
                            onClick={() => {
                                hideDrawer(HeaderMenu.id);
                            }}
                        />
                    </>
                ) : undefined}
            </HeaderMenuLinksWrapper>
        </HeaderMenuRoot>
    );
});
export default HeaderMenu;
