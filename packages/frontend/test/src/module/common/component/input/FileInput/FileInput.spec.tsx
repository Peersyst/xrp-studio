import userEvent from "@testing-library/user-event";
import FileInput from "module/common/component/input/FileInput/FileInput";
import { render, translate } from "test-utils";

describe("Test for the FileInput component", () => {
    test("Renders correctly by default", () => {
        const screen = render(<FileInput />);
        //Placeholder
        expect(screen.getByTestId("ImageUpIcon")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("chooseFile") })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("fileInputPlaceholder") })).toBeInTheDocument();
        expect(screen.getByTestId("ImageUpIcon")).toBeInTheDocument();
    });
    test("Show placeholder -> Upload file -> showDisplay -> hide when click X icon", () => {
        const fileName = "test.png";
        const file = new File(["hello"], fileName, { type: "image/png" });
        const screen = render(<FileInput />);
        //Placeholder
        expect(screen.getByRole("heading", { name: translate("fileInputPlaceholder") })).toBeInTheDocument();
        //Upload file
        const input = screen.getByTestId("upload").getElementsByTagName("input")[0];
        userEvent.upload(input, file);
        expect(input.files).toHaveLength(1);
        //Show display
        expect(screen.getByRole("heading", { name: fileName })).toBeInTheDocument();
        //Hide when click X icon
        const btn = screen.getAllByRole("button")[1];
        userEvent.click(btn);
        expect(screen.getByRole("heading", { name: translate("fileInputPlaceholder") })).toBeInTheDocument();
    });
    test("Show placeholder -> Upload files -> showArrayDisplay", () => {
        const fileName = "test.png";
        const file = new File(["hello"], fileName, { type: "image/png" });
        const files = [file, file, file];
        const screen = render(<FileInput multiple />);
        //Placeholder
        expect(screen.getByRole("heading", { name: translate("fileInputPlaceholder") })).toBeInTheDocument();
        //Upload file
        const input = screen.getByTestId("upload").getElementsByTagName("input")[0];
        userEvent.upload(input, files);
        expect(input.files).toHaveLength(3);
        //Show array display
        expect(screen.getByRole("heading", { name: fileName })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("andNMoreItems", { count: files.length - 1 }) })).toBeInTheDocument();
    });
});
