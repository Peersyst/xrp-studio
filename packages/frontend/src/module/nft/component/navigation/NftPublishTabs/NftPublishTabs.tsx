import { TabPanel, Tabs } from "@peersyst/react-components";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { NftPublishTabsCard } from "module/nft/component/navigation/NftPublishTabs/NftPublishTabs.styles";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import useTranslate from "module/common/hook/useTranslate";

interface NftPublishTabsProps {
    tab: number;
}

const NftPublishTabs = ({ tab }: NftPublishTabsProps): JSX.Element => {
    const translate = useTranslate();

    const steps = [
        {
            title: translate("approveXRPStudio"),
            description: translate("approveXRPStudioDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("confirmCreation"),
            description: translate("confirmCreationDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
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
                <TabPanel index={2}>
                    <NftPublishSuccess />
                </TabPanel>
            </Tabs>
        </NftPublishTabsCard>
    );
};

export default NftPublishTabs;
