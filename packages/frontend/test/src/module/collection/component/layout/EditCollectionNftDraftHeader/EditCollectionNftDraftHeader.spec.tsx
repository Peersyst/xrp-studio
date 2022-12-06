import EditCollectionNftDraftHeader from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader";
import { render, translate } from "test-utils";

describe("Test for EditCollectionNftDraftHeader", () => {
    test("Renders correctly", () => {
        const screen = render(<EditCollectionNftDraftHeader />);
        expect(screen.getByRole("heading", { name: translate("editCollectionNft") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("saveChanges") })).toBeInTheDocument();
        expect(screen.getByTestId("ChevronLeftIcon")).toBeInTheDocument();
    });
});
