import { ExplorePageHeaderRoot } from "module/explore/component/layout/ExplorePageHeader/ExplorePageHeader.styles";
import ExploreTabs from "module/explore/component/layout/ExploreTabs/ExploreTabs";

const ExplorePageHeader = (): JSX.Element => {
    return <ExplorePageHeaderRoot title={"Explore"} footer={<ExploreTabs />} />;
};

export default ExplorePageHeader;
