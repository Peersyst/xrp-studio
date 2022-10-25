import { BaseNftPageProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent";

const BaseNftPage = ({ header, ...rest }: BaseNftPageProps): JSX.Element => {
    return (
        <BasePage>
            {{
                header,
                content: <BaseNftPageContent {...rest} />,
            }}
        </BasePage>
    );
};

export default BaseNftPage;
