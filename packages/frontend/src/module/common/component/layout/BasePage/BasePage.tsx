import { CSSProperties, ReactElement } from "react";
import { BasePageRoot } from "module/common/component/layout/BasePage/BasePage.styles";

/**
 * BasePage
 * Base page that should be use to build every page of this project
 * A BasePage should always be used with { header: PageHeader or a component composing PageHeader, content: PageContent or a component composing PageContent }
 */

interface BasePageProps {
    children: { header?: ReactElement; content: ReactElement };
    className?: string;
    style?: CSSProperties;
}

const BasePage = ({ children: { header, content } }: BasePageProps): JSX.Element => {
    return (
        <BasePageRoot>
            {header}
            {content}
        </BasePageRoot>
    );
};

export default BasePage;
