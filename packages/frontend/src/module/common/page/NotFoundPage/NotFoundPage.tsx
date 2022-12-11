import NotFoundBanner from "module/common/component/feedback/NotFoundBanner/NotFoundBanner";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";

const NotFoundPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <PageHeader />,
                content: <NotFoundBanner />,
            }}
        </BasePage>
    );
};

export default NotFoundPage;
