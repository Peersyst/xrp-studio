import { NotFoundPageRoot } from "module/common/page/NotFoundPage/NotFoundPage.styles";
import NotFoundBanner from "module/common/component/feedback/NotFoundBanner/NotFoundBanner";

const NotFoundPage = (): JSX.Element => {
    return (
        <NotFoundPageRoot>
            <NotFoundBanner />
        </NotFoundPageRoot>
    );
};

export default NotFoundPage;
