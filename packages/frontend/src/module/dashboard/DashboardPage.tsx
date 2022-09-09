import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import BackButton from "module/common/component/navigation/BackButton/BackButton";

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
                        <Row gap="1rem" wrap wrapGap="1rem">
                            <BackButton />
                        </Row>
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
