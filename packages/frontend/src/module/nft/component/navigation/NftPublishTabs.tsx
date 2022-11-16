import { Tab, Tabs } from "@peersyst/react-components";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishTabsCard } from "module/nft/component/navigation/NftPublishTabs.styles";

const NftPublishTabs = () => {
    return (
        <NftPublishTabsCard>
            <Tabs>
                <Tab index={0}>
                    <NftInformation />
                </Tab>
            </Tabs>
        </NftPublishTabsCard>
    );
};

export default NftPublishTabs;
