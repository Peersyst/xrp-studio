import NftCardStatusChip from "module/nft/component/display/NftCardStatusChip/NftCardStatusChip";
import { NftDtoMock } from "test-mocks";
import { fireEvent, render, translate } from "test-utils";

describe("NftCardStatusChip", () => {
    test("Status draft", async () => {
        const nftMock = new NftDtoMock({ status: "draft" });

        const screen = render(<NftCardStatusChip label={nftMock.status} status={nftMock.status} nftId={nftMock.id} />);

        expect(screen.getByText(nftMock.status)).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByText(nftMock.status));
        expect(screen.queryByText(translate("publish"))).not.toBeInTheDocument();
    });

    test("Status failed", async () => {
        const nftMock = new NftDtoMock({ status: "failed" });

        const screen = render(<NftCardStatusChip label={nftMock.status} status={nftMock.status} nftId={nftMock.id} />);

        expect(screen.getByText(nftMock.status)).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByText(nftMock.status));
        expect(screen.queryByText(translate("publish"))).toBeInTheDocument();
    });
});
