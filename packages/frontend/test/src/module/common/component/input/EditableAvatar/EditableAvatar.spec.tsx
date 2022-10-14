import userEvent from "@testing-library/user-event";
import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import { render, translate } from "test-utils";

describe("Test EditableAvatar", () => {
    test("Renders correctly with an image", () => {
        const mockedOnChange = jest.fn();
        const image = new File(["hello"], "test.png", { type: "image/png" });
        const screen = render(
            <EditableAvatar
                editableImageProps={{ onChange: mockedOnChange }}
                avatarProps={{
                    img: "",
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
    });
});
