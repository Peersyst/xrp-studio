import { screen } from "@testing-library/react";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { render, translate } from "test-utils";
import { NftDtoMock } from "test-mocks";
import { NftRoutes } from "module/nft/NftRouter";
import { NftService } from "module/api/service";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";

describe("NftCard", () => {
    const nftMock = new NftDtoMock();
    const nftDraftMock = new NftDtoMock({ status: "draft" });

    test("Renders correctly with note", () => {
        render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
    });

    test("Renders correctly status different than confirmed", () => {
        nftMock.status = "draft";
        const screen = render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
        expect(screen.getByText("draft")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", `${NftRoutes.NFT_CREATION}?id=${nftMock.id}`);
    });

    test("Renders correctly status confirmed", () => {
        nftMock.status = "confirmed";
        const screen = render(<NftCard nft={nftMock} />);
        expect(screen.getByText(nftMock.metadata!.name!)).toBeInTheDocument();
        expect(screen.queryByText("confirmed")).not.toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", NftRoutes.VIEW_NFT.replace(":id", nftMock.id.toString()));
    });

    test("Delete draft", async () => {
        const deleteNftDraftMock = jest.spyOn(NftService, "nftControllerDeleteNftDraft").mockResolvedValue(undefined);

        render(<NftCard nft={nftDraftMock} />);

        userEvent.click(screen.getByTestId("CrossIcon"));
        userEvent.click(screen.getByRole("button", { name: translate("delete") }));
        await waitFor(() => expect(deleteNftDraftMock).toHaveBeenCalledWith(nftDraftMock.id));
    });
});
