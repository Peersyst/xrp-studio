import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import SecondaryPageHeader from "../SecondaryPageHeader/SecondaryPageHeader";
import { SecondaryPageProps } from "./SecondaryPage.types";

export default function SecondaryPage({ title, children }: SecondaryPageProps): JSX.Element {
    const { content, ...rest } = children;
    return (
        <BasePage>
            {{
                header: (
                    <PageHeader withBorder>
                        <SecondaryPageHeader title={title}>{{ ...rest }}</SecondaryPageHeader>
                    </PageHeader>
                ),
                content: <PageContent>{content}</PageContent>,
            }}
        </BasePage>
    );
}
