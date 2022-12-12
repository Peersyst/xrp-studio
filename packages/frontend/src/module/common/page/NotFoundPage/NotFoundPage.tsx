import NotFoundBanner from "module/common/component/feedback/NotFoundBanner/NotFoundBanner";
import BasePage from "module/common/component/layout/BasePage/BasePage";

const NotFoundPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                content: <NotFoundBanner />,
            }}
        </BasePage>
    );
};

export default NotFoundPage;
