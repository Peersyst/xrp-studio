import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionCard from "module/common/component/surface/CollectionCard/CollectionCard";
import CollectionDtoMock from "../../../../../__mocks__/collection.dto.mock";

describe("CollectionCard", () => {
    const collectionMock = new CollectionDtoMock();

    test("Renders correctly with note", () => {
        render(<CollectionCard collection={collectionMock} />);
        expect(screen.getByText(collectionMock!.name!)).toBeInTheDocument();
        expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "collection-" + collectionMock.id + "-cover");
        expect(screen.getAllByRole("img")[1]).toHaveAttribute("alt", "collection-" + collectionMock.id + "-image");
        expect(screen.getByText(`${Intl.NumberFormat().format(collectionMock.items)} ${translate("items").toLowerCase()}`));
    });
});
