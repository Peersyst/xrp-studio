import userEvent from "@testing-library/user-event";
import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import { render, translate, waitFor } from "test-utils";
import * as uploadFile from "module/api/service/helper/uploadFile";

describe("Test EditableAvatar", () => {
    test("Renders correctly with an image", async () => {
        const imgUrl = "avatar_url";
        jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(imgUrl);
        const mockedOnChange = jest.fn();
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const screen = render(
            <EditableAvatar
                editableImageProps={{ onChange: mockedOnChange }}
                avatarProps={{
                    img: "avatar",
                    alt: "avatar-test",
                }}
            />,
        );
        const btn = screen.getByRole("button", { name: translate("change") });
        expect(btn).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(3);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "avatar-test");
        const input = btn.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, image);
        expect(input!.files).toHaveLength(1);
        await waitFor(() => expect(mockedOnChange).toHaveBeenCalledWith(imgUrl));
    });
});
