import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Select, SelectItem, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";

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
                        <Select placeholder="AAA">
                            <SelectItem value={1}>Item1</SelectItem>
                            <SelectItem value={2}>Item2</SelectItem>
                        </Select>
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
