import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { render, translate } from "test-utils";

describe("Nothing to show", () => {
    test("should render default nothing to show", () => {
        const { getByRole } = render(<NothingToShow />);
        expect(getByRole("heading", { name: translate("nothingToShow", { ns: "error" }) })).toBeInTheDocument();
    });

    test("should render custom component ", () => {
        const { getByText } = render(
            <NothingToShow>
                <>Custom component</>
            </NothingToShow>,
        );
        expect(getByText("Custom component")).toBeInTheDocument();
    });
    test("should render custom text ", () => {
        const { getByRole } = render(<NothingToShow>{"Custom text"}</NothingToShow>);
        expect(getByRole("heading", { name: "Custom text" })).toBeInTheDocument();
    });
});
