import { render } from "test-utils";
import { config } from "config";
import XummAppLink from "module/wallet/component/navigation/XummAppLink/XummAppLink";

describe("XummAppLink", () => {
    test("Renders correctly app store", () => {
        const { getByRole } = render(<XummAppLink.AppStore />);
        expect(getByRole("img", { name: "app-store-logo" })).toBeInTheDocument();
        const anchor = getByRole("link");
        expect(anchor).toHaveAttribute("href", config.appStoreXummLink);
    });
    test("Renders correctly play store", () => {
        const { getByRole } = render(<XummAppLink.PlayStore />);
        expect(getByRole("img", { name: "play-store-logo" })).toBeInTheDocument();
        const anchor = getByRole("link");
        expect(anchor).toHaveAttribute("href", config.playStoreXummLink);
    });
});
