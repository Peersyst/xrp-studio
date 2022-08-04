import { CSSProperties, ReactNode } from "react";
import { PageContentRoot } from "module/common/component/layout/PageContent/PageContent.styles";

export interface PageContentProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const PageContent = (props: PageContentProps): JSX.Element => <PageContentRoot {...props} />;

export default PageContent;
