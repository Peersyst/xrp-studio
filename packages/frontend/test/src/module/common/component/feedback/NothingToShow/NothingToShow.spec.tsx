import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { render } from "test-utils";

describe("Nothing to show", () => {
    test("should render custom text ", () => {
        const { getByRole, getByText } = render(<NothingToShow label="Custom Text" />);
        expect(getByRole("heading", { name: "Custom text" })).toBeInTheDocument();
    });
});
