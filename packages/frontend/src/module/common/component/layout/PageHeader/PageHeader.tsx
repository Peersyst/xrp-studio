import { CSSProperties, ReactNode } from "react";
import { PageHeaderRoot } from "module/common/component/layout/PageHeader/PageHeader.styles";
import { useHeaderRef } from "module/common/component/layout/BasePage/PageContext";

export interface PageHeaderProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    withBorder?: boolean;
}

const PageHeader = ({ withBorder = false, ...rest }: PageHeaderProps): JSX.Element => {
    const headerRef = useHeaderRef();
    return <PageHeaderRoot withBorder={withBorder} ref={headerRef} {...rest} />;
};

export default PageHeader;
