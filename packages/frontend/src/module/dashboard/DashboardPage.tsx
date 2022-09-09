import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import { SocialButtons } from "module/common/component/navigation/SocialButtons/SocialButtons";

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
                        <Row gap="1rem">
                            <SocialButtons userId="1234" twitterId="Peersyst" discordId="1234" />
                        </Row>
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
