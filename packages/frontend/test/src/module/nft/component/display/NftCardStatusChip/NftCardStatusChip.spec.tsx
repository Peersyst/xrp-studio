import NftCardStatusChip from "module/nft/component/display/NftCardStatusChip/NftCardStatusChip";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import { NftRoutes } from "module/nft/NftRouter";
import { NftDtoMock } from "test-mocks";
import { fireEvent, render, translate } from "test-utils";

describe("NftCardStatusChip", () => {
    test("Status confirmed", async () => {
        const nftMock = new NftDtoMock();
        const screen = render(
            <BaseCard
                title={nftMock.id.toString()}
                status={
                    nftMock.status !== "confirmed" && (
                        <NftCardStatusChip label={nftMock.status} status={nftMock.status} idNFT={nftMock.id} />
                    )
                }
                to={
                    nftMock.status === "confirmed"
                        ? NftRoutes.VIEW_NFT.replace(":id", nftMock.id.toString())
                        : `${NftRoutes.NFT_CREATION}?id=${nftMock.id}`
                }
            />,
        );
        // Cuando es confirmed no se muestra el chip
        expect(screen.queryByText(nftMock.status)).not.toBeInTheDocument();
    });

    test("Status draf", async () => {
        const nftMock = new NftDtoMock({ status: "draft" });
        const screen = render(
            <BaseCard
                title={nftMock.id.toString()}
                status={
                    nftMock.status !== "confirmed" && (
                        <NftCardStatusChip label={nftMock.status} status={nftMock.status} idNFT={nftMock.id} />
                    )
                }
                to={
                    nftMock.status === "confirmed"
                        ? NftRoutes.VIEW_NFT.replace(":id", nftMock.id.toString())
                        : `${NftRoutes.NFT_CREATION}?id=${nftMock.id}`
                }
            />,
        );
        // Cuando es draf se muestra el chip
        expect(screen.getByText(nftMock.status)).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByText(nftMock.status));
        expect(screen.queryByText(translate("publish"))).not.toBeInTheDocument();
    });

    test("Status draf", async () => {
        const nftMock = new NftDtoMock({ status: "failed" });
        const screen = render(
            <BaseCard
                title={nftMock.id.toString()}
                status={
                    nftMock.status !== "confirmed" && (
                        <NftCardStatusChip label={nftMock.status} status={nftMock.status} idNFT={nftMock.id} />
                    )
                }
                to={
                    nftMock.status === "confirmed"
                        ? NftRoutes.VIEW_NFT.replace(":id", nftMock.id.toString())
                        : `${NftRoutes.NFT_CREATION}?id=${nftMock.id}`
                }
            />,
        );
        // Cuando es failed y se hace hover, se muestra el texto publicar
        expect(screen.getByText(nftMock.status)).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByText(nftMock.status));
        expect(screen.queryByText(translate("publish"))).toBeInTheDocument();
    });
});
