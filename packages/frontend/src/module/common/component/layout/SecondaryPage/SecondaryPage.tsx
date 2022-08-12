import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import SecondaryPageHeader from "../SecondaryPageHeader/SecondaryPageHeader";
import { SecondaryPageProps } from "./SecondaryPage.types";

export default function SecondaryPage({ children, ...headerProps }: SecondaryPageProps): JSX.Element {
    return (
        <BasePage>
            {{
                header: (
                    <PageHeader withBorder>
                        <SecondaryPageHeader {...headerProps} />
                    </PageHeader>
                ),
                content: <PageContent>{children}</PageContent>,
            }}
        </BasePage>
    );
}
