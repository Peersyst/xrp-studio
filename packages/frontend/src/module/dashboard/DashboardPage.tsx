import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";

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
                        <Row flex={1} css={{ maxWidth: "40rem" }}>
                            <PropertiesInput css={{ flex: 1 }} label="Properties" />
                        </Row>
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
