import Dialog from "module/common/component/feedback/Dialog/Dialog";
import { render } from "test-utils";

describe("Test Dialog component", () => {
    test("Dialog component should render", () => {
        const screen = render(<Dialog> Dialog</Dialog>);
        expect(screen.getByText("Dialog")).toBeInTheDocument();
    });
});
