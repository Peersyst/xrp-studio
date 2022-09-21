import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import { render } from "test-utils";

describe("Test for the MainPageHeader component", () => {
    test("Renders correctly", () => {
        const title = "title";
        const subtitle = "subtitle";
        const screen = render(<MainPageHeader title={title} subtitle={subtitle} back />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getByTestId("ChevronLeftIcon")).toBeInTheDocument();
    });
    test("Renders correctly complement", () => {
        const title = "title";
        const screen = render(<MainPageHeader title={title} complement={<>Complement</>} />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText("Complement")).toBeInTheDocument();
    });
    test("Renders correctly footer", () => {
        const title = "title";
        const screen = render(<MainPageHeader title={title} footer={<>Footer</>} />);
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
});
