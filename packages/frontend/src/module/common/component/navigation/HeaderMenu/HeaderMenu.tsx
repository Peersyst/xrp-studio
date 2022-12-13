import { createModal, ModalProps, Slide, useDrawer } from "@peersyst/react-components";
import { HeaderMenuLinksWrapper, HeaderMenuRoot } from "./HeaderMenu.styles";
import MenuLinks from "../MenuLinks/MenuLinks";

const HeaderMenu = createModal<ModalProps>((props) => {
    const { hideDrawer } = useDrawer();

    return (
        <HeaderMenuRoot animation={{ AnimatedComponent: Slide, props: { direction: "down" } }} {...props}>
            <HeaderMenuLinksWrapper>
                <MenuLinks
                    onClick={() => {
                        hideDrawer(HeaderMenu.id);
                    }}
                />
            </HeaderMenuLinksWrapper>
        </HeaderMenuRoot>
    );
});
export default HeaderMenu;
