import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionCreationPageContent from "module/collection/page/CollectionCreationPage/CollectionCreationPageContent/CollectionCreationPageContent";
import { CollectionDtoMock } from "test-mocks";

describe("CollectionCreationPageContent", () => {
    test("Renders creation", () => {
        render(<CollectionCreationPageContent collection={undefined} />);

        // Header, image and NFTs upload
        expect(screen.getAllByTestId("ImageUpIcon")).toHaveLength(3);
        // Name
        expect(screen.getByPlaceholderText(translate("collectionNamePlaceholder"))).toBeInTheDocument();
        // Description
        expect(screen.getByPlaceholderText(translate("collectionDescriptionPlaceholder"))).toBeInTheDocument();

        // Transfer fee
        expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
        // External url
        expect(screen.getByPlaceholderText(translate("externalLinkPlaceholder"))).toBeInTheDocument();
        // Background color
        expect(screen.getByPlaceholderText(translate("collectionBackgroundColorPlaceholder"))).toBeInTheDocument();
        // Flags
        expect(screen.getByText(translate("burnable"))).toBeInTheDocument();
        expect(screen.getByText(translate("onlyXRP"))).toBeInTheDocument();
        expect(screen.getByText(translate("transferable"))).toBeInTheDocument();
        // Attributes
        expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
    });

    test("Renders edition", () => {
        const collectionMock = new CollectionDtoMock();

        render(<CollectionCreationPageContent collection={collectionMock} />);

        // Header
        expect(screen.getByAltText("collection-cover-img")).toHaveAttribute("src", collectionMock.header);
        // Image
        expect(screen.getByAltText("collection-img")).toHaveAttribute("src", collectionMock.image);
        // Name
        expect(screen.getByDisplayValue(collectionMock.name!)).toBeInTheDocument();
        // Description
        expect(screen.getByDisplayValue(collectionMock.description!)).toBeInTheDocument();
        // Issuer and friends are not rendered
        expect(screen.queryByText(translate("issuer"))).toBeNull();
    });
});
