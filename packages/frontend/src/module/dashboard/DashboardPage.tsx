import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import CollectionCard from "module/nft/component/surface/CollectionCard/CollectionCard";

export default function DashboardPage(): JSX.Element {
    const translate = useTranslate();

    return (
        <BasePage>
            {{
                header: (
                    <PageHeader>
                        <Typography variant="subtitle1">{translate("name")}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {config.projectName}
                        </Typography>
                    </PageHeader>
                ),
                content: (
                    <PageContent>
                        <CollectionCard
                            collection={{
                                id: 0,
                                taxon: 0,
                                name: undefined,
                                description: undefined,
                                image: undefined,
                                header: undefined,
                                items: 897987987890.998798,
                                user: {
                                    address: "",
                                    name: undefined,
                                    description: undefined,
                                    image: undefined,
                                    header: undefined,
                                    twitter: undefined,
                                    discord: undefined,
                                },
                            }}
                        />
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
