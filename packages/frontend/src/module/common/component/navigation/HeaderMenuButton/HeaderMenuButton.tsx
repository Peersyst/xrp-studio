import { Animated, IconButton, TransitionStyles, useDrawer } from "@peersyst/react-components";
import { CrossIcon, MenuIcon } from "icons";
import { useMemo } from "react";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { HeaderMenuButtonRoot } from "./HeaderMenuButton.styles";

const menuIconAnimation: TransitionStyles = {
    entering: {
        transform: "rotate(-90deg)",
    },
    entered: {
        transform: "rotate(-90deg)",
    },
    exiting: {
        transform: "rotate(0)",
    },
    exited: {
        transform: "rotate(0)",
    },
};

export default function HeaderMenuButton(): JSX.Element {
    const { showDrawer, isDrawerActive, hideDrawer } = useDrawer();
    const menuIsOpen = useMemo(() => isDrawerActive(HeaderMenu), [isDrawerActive]);

    const handleClick = () => {
        if (!menuIsOpen) showDrawer(HeaderMenu);
        else hideDrawer(HeaderMenu);
    };

    return (
        <HeaderMenuButtonRoot>
            <Animated animation={menuIconAnimation} animatedProperties="transform" in={menuIsOpen} hideOnExit={false} duration={200}>
                <IconButton onClick={handleClick} css={{ fontSize: "20px" }}>
                    {menuIsOpen ? <CrossIcon /> : <MenuIcon />}
                </IconButton>
            </Animated>
        </HeaderMenuButtonRoot>
    );
}
