import BasePage from "module/common/component/layout/BasePage/BasePage";
import MyNftsPageContent from "../component/layout/MyNftsPageContent/MyNftsPageContent";
import MyNftsPageHeader from "../component/layout/MyNftsPageHeader/MyNftsPageHeader";

const MyNftsPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <MyNftsPageHeader />,
                content: <MyNftsPageContent />,
            }}
        </BasePage>
    );
};

export default MyNftsPage;
