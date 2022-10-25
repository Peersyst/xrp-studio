import FileDisplay from "module/common/component/display/FileDisplay/FileDisplay";
import { render, translate } from "test-utils";

describe("Test for the FileDisplay component", () => {
    test("Renders correctly", () => {
        const fileName = "test.png";
        const file = new File(["hello"], fileName, { type: "image/png" });
        const screen = render(<FileDisplay file={file} />);
        expect(screen.getByTestId("ImageIcon")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("selectAnotherFile") })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: fileName })).toBeInTheDocument();
    });
    test("Renders correctly with multiple files", () => {
        const fileName = "test.png";
        const file = new File(["hello"], fileName, { type: "image/png" });
        const files = [file, file, file];
        const screen = render(<FileDisplay file={files} />);
        expect(screen.getByTestId("ImageIcon")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("selectAnotherFile") })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: fileName })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("andNMoreItems", { count: files.length - 1 }) })).toBeInTheDocument();
    });
});
