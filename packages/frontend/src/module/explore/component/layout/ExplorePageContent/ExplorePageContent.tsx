import PageContent from "module/common/component/layout/PageContent/PageContent";
import { TabPanel } from "@peersyst/react-components";
import ExploreCollectionsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreCollectionsGrid";
import ExploreNftGrid from "module/explore/component/display/ExploreNftGrid/ExploreNftGrid";

const ExplorePageContent = (): JSX.Element => {
    return (
        <PageContent>
            <TabPanel index={0}>This is Trending panel</TabPanel>
            <TabPanel index={1}>
                <ExploreCollectionsGrid />
            </TabPanel>
            <TabPanel index={2}>
                <ExploreNftGrid />
            </TabPanel>
        </PageContent>
    );
};

export default ExplorePageContent;
