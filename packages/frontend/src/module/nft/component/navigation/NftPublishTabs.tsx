import { TabPanel, Tabs } from "@peersyst/react-components";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishTabsCard } from "module/nft/component/navigation/NftPublishTabs.styles";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";

interface NftPublishTabsProps {
    tab: number;
}

const NftPublishTabs = ({ tab }: NftPublishTabsProps): JSX.Element => {
    const steps = [
        {
            title: "Approve XRP-Studio",
            description:
                "To get set up for interacting on XRP Studio for the first time, you must approve for interacting NFT, which requires a one-time transaction.",
            execution: async () => {
                return undefined;
            },
        },
        {
            title: "Confirm the creation",
            description: "Accept the transaction request in your wallet in order to continue with the creation process.",
            execution: async () => {
                return undefined;
            },
        },
        {
            title: "Success!",
            description: "Your NFT has been published successfully. We are updating our orders.",
            execution: async () => {
                return undefined;
            },
        },
    ];

    return (
        <NftPublishTabsCard>
            <Tabs index={tab}>
                <TabPanel index={0}>
                    <NftInformation />
                </TabPanel>
                <TabPanel index={1}>
                    <NftPublishActions steps={steps} />
                </TabPanel>
            </Tabs>
        </NftPublishTabsCard>
    );
};

export default NftPublishTabs;
