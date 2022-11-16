import { Tab, Tabs } from "@peersyst/react-components";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";

const NftPublishTabs = () => {
    return (
        <Tabs>
            <Tab index={0}>
                <NftInformation />
            </Tab>
        </Tabs>
    );
};

export default NftPublishTabs;
