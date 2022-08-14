import { screen } from "@testing-library/react";
import { render } from "test-utils";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import PageContent from "module/common/component/layout/PageContent/PageContent";

describe("BasePage", () => {
    test("Renders correctly", () => {
        render(
            <BasePage>
                {{
                    header: <PageHeader style={{ height: "100px" }}>Page Header</PageHeader>,
                    content: <PageContent>Page Content</PageContent>,
                }}
            </BasePage>,
        );
        expect(screen.getByText("Page Header"));
        expect(screen.getByText("Page Content"));
    });
});
