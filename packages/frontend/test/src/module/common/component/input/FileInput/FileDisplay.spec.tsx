import FileDisplay from "module/common/component/input/FileInput/FileDisplay/FileDisplay";
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
});
