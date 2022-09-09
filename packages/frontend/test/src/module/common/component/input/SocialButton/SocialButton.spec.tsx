import SocialButton from "module/common/component/input/SocialButton/SocialButton";
import { render } from "test-utils";

describe("SocialButton", () => {
    test("Renders twitter", () => {
        const { getByTestId } = render(<SocialButton type="twitter" />);
        expect(getByTestId("TwitterIcon")).toBeInTheDocument();
    });
    test("Renders discord", () => {
        const { getByTestId } = render(<SocialButton type="discord" />);
        expect(getByTestId("DiscordIcon")).toBeInTheDocument();
    });
    test("Renders share", () => {
        const { getByTestId } = render(<SocialButton type="share" />);
        expect(getByTestId("ShareIcon")).toBeInTheDocument();
    });
});
