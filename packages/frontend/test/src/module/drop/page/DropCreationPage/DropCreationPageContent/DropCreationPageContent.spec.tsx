import { screen } from "@testing-library/react";
import DropCreationPageContent from "module/drop/page/DropCreationPageContent/DropCreationPageContent";
import { render, translate } from "test-utils";
import { CollectionDtoMock, PaginatedNftsMock } from "test-mocks";
import { NftService } from "module/api/service";
import { waitFor } from "@testing-library/dom";

describe("DropCreationPageContent", () => {
    test("Renders creation", async () => {
        const collectionDtoMock = new CollectionDtoMock();
        const paginatedNftsMock = new PaginatedNftsMock().pages[0];

        jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftsMock);

        render(<DropCreationPageContent collection={collectionDtoMock} />);

        // Price
        expect(screen.getByPlaceholderText(translate("price"))).toBeInTheDocument();
        // Background Color
        expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
        // Font Color
        expect(screen.getByText(translate("fontColor"))).toBeInTheDocument();
        // Video Trailer Url
        expect(screen.getByPlaceholderText(translate("videoTrailerURL"))).toBeInTheDocument();
        // Instagram
        expect(screen.getByPlaceholderText(translate("instagram"))).toBeInTheDocument();
        // Twitter
        expect(screen.getByPlaceholderText(translate("twitter"))).toBeInTheDocument();
        // Discord
        expect(screen.getByPlaceholderText(translate("discord"))).toBeInTheDocument();
        // Faqs
        expect(screen.getAllByText(translate("faqs"))).toHaveLength(1);
        // Preview
        await waitFor(() => expect(screen.getByRole("heading", { name: collectionDtoMock.name })).toBeInTheDocument());
    });
});
