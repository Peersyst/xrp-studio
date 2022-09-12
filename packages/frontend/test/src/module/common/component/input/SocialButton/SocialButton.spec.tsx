import SocialButton from "module/common/component/input/SocialButton/SocialButton";
import { render, fireEvent } from "test-utils";

describe("SocialButton", () => {
    test("Renders twitter", () => {
        const link = "https://twitter.com/Peersyst";
        const { getByTestId, getByRole, getByText } = render(<SocialButton icon="twitter" link={link} />);
        expect(getByTestId("TwitterIcon")).toBeInTheDocument();
        //Show popover
        const btn = getByRole("button");
        fireEvent.mouseEnter(btn);
        expect(getByText("twitter")).toBeInTheDocument();
        //Link works correctly
        const linkIcons = getByRole("link");
        expect(linkIcons).toHaveAttribute("href", link);
        expect(linkIcons).toHaveAttribute("target", "_blank");
        expect(linkIcons).toHaveAttribute("rel", "noopener noreferrer");
    });
    test("Renders discord", () => {
        const link = "https://discordapp.com/users/4321";
        const { getByTestId, getByRole, getByText } = render(<SocialButton icon="discord" link={link} />);
        expect(getByTestId("DiscordIcon")).toBeInTheDocument();
        //Show popover
        const btn = getByRole("button");
        fireEvent.mouseEnter(btn);
        expect(getByText("discord")).toBeInTheDocument();
        //Link works correctly
        const linkIcons = getByRole("link");
        expect(linkIcons).toHaveAttribute("href", link);
        expect(linkIcons).toHaveAttribute("target", "_blank");
        expect(linkIcons).toHaveAttribute("rel", "noopener noreferrer");
    });
    test("Renders share", () => {
        const { getByTestId, getByRole, getByText } = render(<SocialButton icon="share" />);
        expect(getByTestId("ShareIcon")).toBeInTheDocument();
        //Show popover
        const btn = getByRole("button");
        fireEvent.mouseEnter(btn);
        expect(getByText("share")).toBeInTheDocument();
    });
});
