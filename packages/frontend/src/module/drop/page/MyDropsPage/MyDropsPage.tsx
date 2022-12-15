import BasePage from "module/common/component/layout/BasePage/BasePage";
import MyDropPageHeader from "module/drop/page/MyDropsPage/MyDropsPageHeader/MyDropPageHeader";
import MyDropsPageContent from "module/drop/page/MyDropsPage/MyDropsPageContent/MyDropsPageContent";

const MyDropsPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <MyDropPageHeader />,
                content: <MyDropsPageContent />,
            }}
        </BasePage>
    );
};

export default MyDropsPage;
