import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Row, SelectItem, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import Select from "module/common/component/input/Select/Select";

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
                        <Row>
                            <Select placeholder="AAA" size="md" variant="filled" css={{ width: "20rem" }}>
                                <SelectItem value={1}>Item1</SelectItem>
                                <SelectItem value={2}>Item2</SelectItem>
                            </Select>
                        </Row>
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
