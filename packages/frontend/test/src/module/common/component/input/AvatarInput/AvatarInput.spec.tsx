import { render, translate } from "test-utils";
import AvatarInput from "module/common/component/input/AvatarInput/AvatarInput";

describe("AvatarInput", () => {
    test("Renders correctly", async () => {
        const screen = render(<AvatarInput defaultValue="avatar" alt="avatar-test" />);
        const btn = screen.getByRole("button", { name: translate("change") });
        expect(btn).toBeInTheDocument();
        const imgs = screen.getAllByRole("img");
        expect(imgs).toHaveLength(3);
        const img = imgs[0];
        expect(img).toHaveAttribute("alt", "avatar-test");
        expect(btn.parentElement?.parentElement?.getElementsByTagName("input")[0]).toBeInTheDocument();
    });
});
