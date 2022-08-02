import { screen } from "@testing-library/react";
import { render } from "test-utils";
import CollectionMock from "../../../../../__mocks__/Collection.mock";
import CollectionCard from "module/common/component/surface/CollectionCard/CollectionCard";

describe("CollectionCard", () => {
    const collectionMock = new CollectionMock();

    test("Renders correctly with note", () => {
        render(<CollectionCard collection={collectionMock} />);
        expect(screen.getByText(collectionMock.name)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("alt", collectionMock.name);
    });
});
