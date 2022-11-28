import { ExplorePageHeaderRoot } from "module/explore/component/ExplorePageHeader/ExplorePageHeader.styles";
import ExploreTabs from "module/explore/component/ExploreTabs/ExploreTabs";

const ExplorePageHeader = (): JSX.Element => {
    return <ExplorePageHeaderRoot title={"Explore"} footer={<ExploreTabs />} />;
};

export default ExplorePageHeader;
