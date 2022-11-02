import { createRef, CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import {
    MainPageHeader,
    MainPageHeaderContent,
    PageHeaderRoot,
    PageStickyHeader,
} from "module/common/component/layout/PageHeader/PageHeader.styles";
import { Animated, Typography } from "@peersyst/react-components";

export interface PageHeaderProps {
    stickyTitle?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const PageHeader = ({ children, stickyTitle, ...rest }: PageHeaderProps): JSX.Element => {
    const headerRef = createRef<HTMLDivElement>();
    const [visible, setVisible] = useState(true);
    const headerObserver = useRef(
        new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setVisible(!entry.isIntersecting);
            },
            {
                rootMargin: "-100px 0px 0px 0px",
            },
        ),
    ).current;

    useEffect(() => {
        const currentHeaderRef = headerRef.current;
        if (currentHeaderRef) headerObserver.observe(currentHeaderRef);
        return () => {
            if (currentHeaderRef) headerObserver.disconnect();
        };
    }, [headerRef]);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <PageHeaderRoot {...rest}>
            <MainPageHeader ref={headerRef} className="main-header">
                <MainPageHeaderContent>{children}</MainPageHeaderContent>
            </MainPageHeader>
            {stickyTitle !== undefined && (
                <Animated.Fade in={visible} duration={{ enter: 250, exit: 200 }}>
                    <PageStickyHeader onClick={scrollToTop} className="sticky-header">
                        <Typography variant="subtitle2" fontWeight={700}>
                            {stickyTitle}
                        </Typography>
                    </PageStickyHeader>
                </Animated.Fade>
            )}
        </PageHeaderRoot>
    );
};

export default PageHeader;
