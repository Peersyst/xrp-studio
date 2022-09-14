import FileInputPlaceholder from "module/common/component/input/FileInput/FileInputPlaceholder/FileInputPlaceholder";
import { render, translate } from "test-utils";

describe("Test for the FileInput component", () => {
    test("Renders correctly when not dragging files", () => {
        const screen = render(<FileInputPlaceholder drag={false} />);
        expect(screen.getByRole("button", { name: translate("chooseFile") })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("fileInputPlaceholder") })).toBeInTheDocument();
        expect(screen.getByTestId("ImageUpIcon")).toBeInTheDocument();
    });
    test("Renders correctly when dragging files", () => {
        const screen = render(<FileInputPlaceholder drag />);
        expect(screen.getByRole("heading", { name: translate("onDragText") })).toBeInTheDocument();
    });
});