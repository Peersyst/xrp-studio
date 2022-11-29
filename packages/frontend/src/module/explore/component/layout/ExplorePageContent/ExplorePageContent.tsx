import { TabPanel } from "@peersyst/react-components";
import ExploreNftTab from "module/explore/component/layout/ExploreNftTab/ExploreNftTab";
import PageContent from "module/common/component/layout/PageContent/PageContent";

const ExplorePageContent = (): JSX.Element => {
    return (
        <>
            <TabPanel index={0}>This is Trending panel</TabPanel>
            <TabPanel index={1}>This is Collections panel</TabPanel>
            <TabPanel index={2}>
                <PageContent>
                    <ExploreNftTab />
                </PageContent>
            </TabPanel>
        </>
    );
};

export default ExplorePageContent;
