import { TabPanel, Tabs } from "@peersyst/react-components";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishTabsCard } from "module/nft/component/navigation/NftPublishTabs.styles";

interface NftPublishTabsProps {
    tab: number;
}

const NftPublishTabs = ({ tab }: NftPublishTabsProps): JSX.Element => {
    return (
        <NftPublishTabsCard>
            <Tabs index={tab}>
                <TabPanel index={0}>
                    <NftInformation />
                </TabPanel>
            </Tabs>
        </NftPublishTabsCard>
    );
};

export default NftPublishTabs;
