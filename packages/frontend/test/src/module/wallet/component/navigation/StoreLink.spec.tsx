import StoreLink from "module/wallet/component/navigation/StoreLink/StoreLink";
import { render } from "test-utils";
import { config } from "config";

describe("Test for the Store link component", () => {
    test("Renders correctly app store", () => {
        const { getByRole } = render(<StoreLink type="appStore" />);
        expect(getByRole("img", { name: "app-store-logo" })).toBeInTheDocument();
        const anchor = getByRole("link");
        expect(anchor).toHaveAttribute("href", config.appStoreXummLink);
    });
    test("Renders correctly", () => {
        const { getByRole } = render(<StoreLink type="playStore" />);
        expect(getByRole("img", { name: "play-store-logo" })).toBeInTheDocument();
        const anchor = getByRole("link");
        expect(anchor).toHaveAttribute("href", config.playStoreXummLink);
    });
});
