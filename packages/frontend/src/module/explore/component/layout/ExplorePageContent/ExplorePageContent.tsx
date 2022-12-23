import PageContent from "module/common/component/layout/PageContent/PageContent";
import { TabPanel } from "@peersyst/react-components";
import ExploreCollectionsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreCollectionsGrid";
import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";
import ExploreTrending from "module/explore/component/display/ExploreTrending/ExploreTrending";

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
                    <ExploreCollectionsGrid />
                </PageContent>
            </TabPanel>
            <TabPanel index={2}>
                <PageContent>
                    <ExploreNftGrid />
                </PageContent>
            </TabPanel>
        </>
    );
};

export default ExplorePageContent;
