import { CSSProperties, ReactNode } from "react";
import { PageHeaderRoot } from "module/common/component/layout/PageHeader/PageHeader.styles";
import { useHeaderRef } from "module/common/component/layout/BasePage/PageContext";

export interface PageHeaderProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const PageHeader = (props: PageHeaderProps): JSX.Element => {
    const headerRef = useHeaderRef();

    return <PageHeaderRoot ref={headerRef} {...props} />;
};

export default PageHeader;
