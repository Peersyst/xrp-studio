import BasePageHeader from "module/common/component/layout/BasePageHeader/BasePageHeader";
import { render } from "test-utils";

describe("Test for the BasePageHeader component", () => {
    test("Renders correctly", () => {
        const title = "title";
        const subtitle = "subtitle";
        const screen = render(<BasePageHeader title={title} subtitle={subtitle} back />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getByTestId("ChevronLeftIcon")).toBeInTheDocument();
    });
    test("Renders correctly complement", () => {
        const title = "title";
        const screen = render(<BasePageHeader title={title} complement={<>Complement</>} />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText("Complement")).toBeInTheDocument();
    });
    test("Renders correctly footer", () => {
        const title = "title";
        const screen = render(<BasePageHeader title={title} footer={<>Footer</>} />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
});
