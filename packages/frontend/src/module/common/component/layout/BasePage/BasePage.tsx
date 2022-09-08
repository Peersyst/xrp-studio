import { createRef, CSSProperties, ReactElement, useEffect, useRef, useState } from "react";
import { BasePageRoot } from "module/common/component/layout/BasePage/BasePage.styles";
import { PageContext } from "module/common/component/layout/BasePage/PageContext";

/**
 * BasePage
 * Base page that should be use to build every page of this project
 * A BasePage should always be used with { header: PageHeader or a component composing PageHeader, content: PageContent or a component composing PageContent }
 */

interface BasePageProps {
    children: { header: ReactElement; content: ReactElement };
    className?: string;
    style?: CSSProperties;
}

const BasePage = ({ children: { header, content } }: BasePageProps): JSX.Element => {
    /**
     * BasePage is in charge of observing header size and update --page-header-height.
     * This way, we ensure PageContent has perfect positioning.
     * PageHeader ref is passed via a Context. As it is a ref, changing its value does not trigger a general rerender.
     */
    const [headerHeight, setHeaderHeight] = useState<number>();
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

    return (
        <BasePageRoot style={{ "--page-header-height": headerHeight + "px" } as CSSProperties}>
            <PageContext.Provider value={{ headerRef }}>
                {header}
                {content}
            </PageContext.Provider>
        </BasePageRoot>
    );
};

export default BasePage;
