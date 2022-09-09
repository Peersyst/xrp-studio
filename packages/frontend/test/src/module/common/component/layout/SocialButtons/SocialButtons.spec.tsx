import { SocialButtons } from "module/common/component/navigation/SocialButtons/SocialButtons";
import { UserRoutes } from "module/user/UserRouter";
import { fireEvent, render, translate } from "test-utils";

describe("Test SocialButtons", () => {
    test("Renders correctly", () => {
        jest.spyOn(window.navigator, "canShare").mockReturnValueOnce(true);
        const { getByTestId, getAllByRole } = render(<SocialButtons userId="1234" twitterId="Peersyst" discordId="4321" />);
        const linkIcons = getAllByRole("link");
        /**
         * Twitter
         */
        expect(linkIcons[0]).toHaveAttribute("href", "https://twitter.com/Peersyst");
        expect(linkIcons[0]).toHaveAttribute("target", "_blank");
        expect(linkIcons[0]).toHaveAttribute("rel", "noopener noreferrer");
        expect(getByTestId("TwitterIcon")).toBeInTheDocument();
        /**
         * Discord
         *
         */
        expect(linkIcons[1]).toHaveAttribute("href", "https://discordapp.com/users/4321");
        expect(linkIcons[1]).toHaveAttribute("target", "_blank");
        expect(linkIcons[1]).toHaveAttribute("rel", "noopener noreferrer");
        expect(getByTestId("DiscordIcon")).toBeInTheDocument();
        /**
         * Share
         */
        expect(getByTestId("ShareIcon")).toBeInTheDocument();
    });

    test("Renders only discord", () => {
        const { getByTestId, getAllByRole } = render(<SocialButtons userId="1234" discordId="4321" />);
        const linkIcons = getAllByRole("link");
        expect(getByTestId("DiscordIcon")).toBeInTheDocument();
        expect(linkIcons).toHaveLength(1);
    });
    test("Renders only twitter", () => {
        const { getByTestId, getAllByRole } = render(<SocialButtons userId="1234" twitterId="4321" />);
        const linkIcons = getAllByRole("link");
        expect(getByTestId("TwitterIcon")).toBeInTheDocument();
        expect(linkIcons).toHaveLength(1);
    });

    test("Opens share correctly", () => {
        const mockedShare = jest.fn();
        jest.spyOn(window.navigator, "share").mockImplementation(mockedShare);
        jest.spyOn(window.navigator, "canShare").mockReturnValueOnce(true);
        const { getByTestId } = render(<SocialButtons userId="1234" />);
        const shareIcon = getByTestId("ShareIcon");
        expect(shareIcon).toBeInTheDocument();
        fireEvent.click(shareIcon);
        expect(mockedShare).toHaveBeenCalledWith({
            title: "XRP Studio",
            text: translate("checkoutMyProfile"),
            url: window.location.origin + UserRoutes.USER + "1234",
        });
    });
});
