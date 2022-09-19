import { createRef, CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { MainPageHeader, PageHeaderRoot, PageStickyHeader } from "module/common/component/layout/PageHeader/PageHeader.styles";
import { Animated, Typography } from "@peersyst/react-components";
import { useScrollTrigger } from "@peersyst/react-hooks";

export interface PageHeaderProps {
    stickyTitle?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    withBorder?: boolean;
}

const PageHeader = ({ children, stickyTitle, ...rest }: PageHeaderProps): JSX.Element => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const headerRef = createRef<HTMLDivElement>();

    const headerObserver = useRef(
        new ResizeObserver(([headerObs]) => {
            setHeaderHeight(headerObs.target.getBoundingClientRect().height);
        }),
    ).current;

    useEffect(() => {
        const currentHeaderRef = headerRef.current;
        if (currentHeaderRef) headerObserver.observe(currentHeaderRef);
        return () => {
            if (currentHeaderRef) headerObserver.disconnect();
        };
    }, [headerRef]);

    const stickyTrigger = useScrollTrigger({ threshold: headerHeight - 100, disableHysteresis: true });

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <PageHeaderRoot {...rest}>
            <MainPageHeader ref={headerRef} className="main-header">
                {children}
            </MainPageHeader>
            {stickyTitle && (
                <Animated.Fade in={stickyTrigger} duration={{ enter: 300, exit: 200 }}>
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
