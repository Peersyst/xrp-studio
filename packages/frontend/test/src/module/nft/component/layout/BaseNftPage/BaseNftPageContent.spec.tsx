import { screen } from "@testing-library/react";
import { CollectionDtoMock, NftDtoMock, NftsDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent";

describe("BaseNftPageContent", () => {
    test("Renders correctly with default values", () => {
        const nftMock = new NftDtoMock();

        render(<BaseNftPageContent nft={nftMock} />);

        // Test some BaseNftPageForm fields
        // image
        const imgs = screen.getAllByRole("img");
        expect(imgs.some((img) => img.getAttribute("src") === nftMock.metadata!.image!)).toBeTruthy();
        // name
        expect(screen.getByText(translate("name"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.name!)).toBeInTheDocument();
        // attributes
        expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.attributes![0].traitType!)).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.attributes![0].value!)).toBeInTheDocument();
    });

    test("Renders correctly with collectionNfts", () => {
        const collectionMock = new CollectionDtoMock();
        const nftMock = new NftDtoMock({ collection: collectionMock });
        const collectionNftsMock = new NftsDtoMock({ length: 3 }).nfts;

        render(<BaseNftPageContent nft={nftMock} collectionNfts={collectionNftsMock} />);

        // collection
        expect(screen.getByText(translate("collection"))).toBeInTheDocument();
        expect(screen.getByText(translate(nftMock.collection!.name!))).toBeInTheDocument();

        // Collection nfts carousel
        expect(screen.getByText(translate("showCollection"))).toBeInTheDocument();
    });
});
