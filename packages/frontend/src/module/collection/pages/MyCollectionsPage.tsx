import BasePage from "module/common/component/layout/BasePage/BasePage";
import MyCollectionsPageHeader from "module/collection/component/layout/MyCollectionsPageHeader/MyCollectionsPageHeader";
import MyCollectionsPageContent from "module/collection/component/layout/MyCollectionsPageContent/MyCollectionsPageContent";

const MyCollectionsPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <MyCollectionsPageHeader />,
                content: <MyCollectionsPageContent />,
            }}
        </BasePage>
    );
};

export default MyCollectionsPage;
