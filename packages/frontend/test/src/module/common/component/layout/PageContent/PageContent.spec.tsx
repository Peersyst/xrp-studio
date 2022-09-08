import { screen } from "@testing-library/react";
import { render } from "test-utils";
import PageContent from "module/common/component/layout/PageContent/PageContent";

describe("PageContent", () => {
    test("Renders correctly", () => {
        render(<PageContent>Page Content</PageContent>);
        expect(screen.getByText("Page Content"));
    });
});
