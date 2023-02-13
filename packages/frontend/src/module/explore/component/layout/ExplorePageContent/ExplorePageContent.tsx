import PageContent from "module/common/component/layout/PageContent/PageContent";
import { TabPanel } from "@peersyst/react-components";
import ExploreCollectionsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreCollectionsGrid";
import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";
import ExploreTrending from "module/explore/component/display/ExploreTrending/ExploreTrending";
import ExploreDropsGrid from "module/explore/component/display/ExploreDropsGrid/ExploreDropsGrid";

const ExplorePageContent = (): JSX.Element => {
    return (
        <>
            {[
                <ExploreTrending key="trending" />,
                <ExploreDropsGrid key="drops" />,
                <ExploreCollectionsGrid key="collections" />,
                <ExploreNftGrid key="nfts" />,
            ].map((content, index) => (
                <TabPanel index={index} key={index}>
                    <PageContent css={index ? { paddingTop: 0 } : undefined}>{content}</PageContent>
                </TabPanel>
            ))}
        </>
    );
};

export default ExplorePageContent;
