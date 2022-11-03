import userEvent from "@testing-library/user-event";
import * as uploadFile from "module/api/service/helper/uploadFile";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import { act, render, translate } from "test-utils";
import { waitFor } from "@testing-library/dom";

describe("ImageInput", () => {
    const imgUrl = "img_url";
    let uploadFileMock: jest.MockInstance<any, any>;

    beforeAll(() => {
        uploadFileMock = jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(imgUrl);
    });

    afterEach(() => {
        uploadFileMock.mockClear();
    });

    test("Renders correctly with an image", async () => {
        const image = new File(["hello"], "test.png", { type: "image/png" });

        const screen = render(<ImageInput defaultValue="img" alt="test-img" />);

        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(2);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "test-img");
        const input = img.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        // Act has to be used as state is updated after uploading a file
        await act(async () => {
            await waitFor(() => expect(uploadFileMock).toHaveBeenCalledWith(image, "image"));
        });
    });

    test("Renders correctly with children", () => {
        const screen = render(
            <ImageInput alt="test-img" value="url">
                {() => <p>Children</p>}
            </ImageInput>,
        );
        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        expect(screen.getByText("Children")).toBeInTheDocument();
    });
});
