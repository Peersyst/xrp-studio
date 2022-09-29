import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { screen, render } from "test-utils";

describe("Nothing to show", () => {
    test("should render custom text ", () => {
        render(<NothingToShow label="Custom text" />);
        expect(screen.getByRole("heading", { name: "Custom text" })).toBeInTheDocument();
    });
});
