import userEvent from "@testing-library/user-event";
import EditableImage from "module/common/component/input/EditableImage/EditableImage";
import * as uploadFile from "module/api/service/helper/uploadFile";
import { render, translate, waitFor } from "test-utils";

describe("Test EditableImage", () => {
    const imgUrl = "img_url";
    beforeAll(() => {
        jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(imgUrl);
    });
    test("Renders correctly with an image", async () => {
        const mockedOnChange = jest.fn();
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const screen = render(<EditableImage imageProps={{ src: "img", alt: "test-img" }} onChange={mockedOnChange} />);
        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(3);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "test-img");
        const input = img.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        await waitFor(() => expect(mockedOnChange).toHaveBeenCalledWith(imgUrl));
    });
    test("Renders correctly with children", async () => {
        const mockedOnChange = jest.fn();
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const screen = render(
            <EditableImage onChange={mockedOnChange}>
                <p>Children</p>
            </EditableImage>,
        );
        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        const txt = screen.getByText("Children");
        expect(txt).toBeInTheDocument();
        const input = txt.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        await waitFor(() => expect(mockedOnChange).toHaveBeenCalledWith(imgUrl));
    });
});
