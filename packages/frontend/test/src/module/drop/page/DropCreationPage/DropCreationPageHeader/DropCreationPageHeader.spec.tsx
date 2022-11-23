import { render, translate } from "test-utils";
import DropCreationPageHeader from "module/drop/page/DropCreationPage/DropCreationPageHeader/DropCreationPageHeader";

describe("Drop Page Header", () => {
    test("Renders correctly", async () => {
        const screen = render(<DropCreationPageHeader />);

        expect(screen.getByText(translate("customizeDropPage")));
        expect(screen.getByRole("button", { name: translate("cancel") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("launchDrop") })).toBeInTheDocument();
    });
});
