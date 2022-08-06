import { screen, render } from "test-utils";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";

describe("PageHeader", () => {
    test("Renders correctly", () => {
        render(<PageHeader>Header content</PageHeader>);
        expect(screen.getByText("Header content"));
    });
});
