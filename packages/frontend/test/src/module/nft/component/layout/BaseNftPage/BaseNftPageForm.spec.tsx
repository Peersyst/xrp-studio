import { screen } from "@testing-library/react";
import { NftDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import BaseNftPageForm from "module/nft/component/layout/BaseNftPage/BaseNftPageForm";

describe("BaseNftPageForm", () => {
    test("Renders correctly", () => {
        const nftMock = new NftDtoMock();

        render(<BaseNftPageForm nft={nftMock} />);

        // image
        const imgs = screen.getAllByRole("img");
        expect(imgs.some((img) => img.getAttribute("src") === nftMock.metadata!.image!)).toBeTruthy();

        // name
        expect(screen.getByText(translate("name"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.name!)).toBeInTheDocument();

        // description
        expect(screen.getByText(translate("description"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.description!)).toBeInTheDocument();

        // collection
        expect(screen.getByText(translate("collection"))).toBeInTheDocument();
        expect(screen.getByText(translate("collectionPlaceholder"))).toBeInTheDocument();

        // external link
        expect(screen.getByText(translate("externalLink"))).toBeInTheDocument();
        expect(screen.getByPlaceholderText(translate("externalLinkPlaceholder"))).toBeInTheDocument();

        // background color
        expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
        expect(screen.getByPlaceholderText(translate("backgroundColorPlaceholder"))).toBeInTheDocument();

        // attributes
        expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.attributes![0].traitType!)).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.attributes![0].value!)).toBeInTheDocument();
    });
});
