import AppBar from "module/common/component/navigation/AppBar/AppBar";
import { WalletMock } from "test-mocks";
import { render, translate, screen } from "test-utils";

describe("AppBar test", () => {
    test("Renders correctly without login", () => {
        new WalletMock();
        render(<AppBar />);
        expect(screen.queryByText(translate("myNfts"))).not.toBeInTheDocument();
        expect(screen.queryByText(translate("myCollections"))).not.toBeInTheDocument();
    });
});
