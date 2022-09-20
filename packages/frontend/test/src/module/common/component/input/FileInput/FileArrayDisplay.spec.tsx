import FileArrayDisplay from "module/common/component/input/FileInput/FileDisplay/FileArrayDisplay";
import { render, translate } from "test-utils";

describe("Test for the FileArrayDisplay component", () => {
    test("Renders correctly", () => {
        const fileName = "test.png";
        const file = new File(["hello"], fileName, { type: "image/png" });
        const files = [file, file];
        const screen = render(<FileArrayDisplay>{files}</FileArrayDisplay>);
        expect(screen.getByRole("heading", { name: fileName })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("andNMoreItems", { count: files.length - 1 }) })).toBeInTheDocument();
    });
});
