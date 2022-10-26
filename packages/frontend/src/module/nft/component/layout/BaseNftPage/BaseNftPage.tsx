import { BaseNftPageProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent";

const BaseNftPage = ({ children: { header, content }, ...rest }: BaseNftPageProps): JSX.Element => {
    return (
        <BasePage>
            {{
                header,
                content: <BaseNftPageContent {...rest}>{content}</BaseNftPageContent>,
            }}
        </BasePage>
    );
};

export default BaseNftPage;
