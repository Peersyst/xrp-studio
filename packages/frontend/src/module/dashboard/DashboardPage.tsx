import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import { useState } from "react";

export default function DashboardPage(): JSX.Element {
    const translate = useTranslate();
    const [value, setValue] = useState();
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
                        <SelectGroup
                            label={"Select your framework"}
                            value={value}
                            onChange={(value) => {
                                setValue(value as any);
                                console.log(value);
                            }}
                            multiple
                            direction="row"
                            selectorLabelProps={{ placement: "left" }}
                            type="switch"
                            selectorWrapperProps={{ gap: "1rem" }}
                            options={[
                                { label: "React", value: "react" },
                                { label: "Vue", value: "vue" },
                                { label: "Svelte", value: "svelte" },
                                { label: "Flutter", value: "flutter" },
                            ]}
                        />
                    </PageContent>
                ),
            }}
        </BasePage>
    );
}
