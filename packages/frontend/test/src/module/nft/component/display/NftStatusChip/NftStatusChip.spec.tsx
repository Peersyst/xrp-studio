import { NftDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import NftStatusChip from "module/nft/component/display/NftStatusChip/NftStatusChip";

describe("NftStatusChip", () => {
    test("Renders correctly", async () => {
        const nftMock = new NftDtoMock({ status: "draft" });

        const screen = render(<NftStatusChip status={"draft"} />);

        expect(screen.getByText(translate(nftMock.status))).toBeInTheDocument();
    });
});
