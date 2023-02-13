import PageContent from "module/common/component/layout/PageContent/PageContent";
import { TabPanel } from "@peersyst/react-components";
import ExploreCollectionsGrid from "module/explore/component/display/ExploreDropsGrid/ExploreCollectionsGrid";
import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";
import ExploreTrending from "module/explore/component/display/ExploreTrending/ExploreTrending";
import ExploreDropsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreDropsGrid";

const ExplorePageContent = (): JSX.Element => {
    return (
        <>
            <TabPanel index={0}>
                <PageContent>
                    <ExploreTrending />
                </PageContent>
            </TabPanel>
            <TabPanel index={1}>
                <PageContent>
                    <ExploreDropsGrid />
                </PageContent>
            </TabPanel>
            <TabPanel index={2}>
                <PageContent>
                    <ExploreCollectionsGrid />
                </PageContent>
            </TabPanel>
            <TabPanel index={3}>
                <PageContent>
                    <ExploreNftGrid />
                </PageContent>
            </TabPanel>
        </>
    );
};

export default ExplorePageContent;
