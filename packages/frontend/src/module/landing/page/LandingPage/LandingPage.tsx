import BasePage from "module/common/component/layout/BasePage/BasePage";
import LandingPageContent from "./LandingPageContent/LandingPageContent";
import LandingPageHeader from "./LandingPageHeader/LandingPageHeader";

const LandingPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <LandingPageHeader />,
                content: <LandingPageContent />,
            }}
        </BasePage>
    );
};

export default LandingPage;
