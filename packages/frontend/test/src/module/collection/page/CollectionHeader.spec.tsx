import { CollectionService } from "module/api/service";
import CollectionHeader from "module/collection/component/layout/CollectionHeader/CollectionHeader";
import { CollectionDtoMock } from "test-mocks";
import { render, translate, waitFor } from "test-utils";
import * as Router from "react-router-dom";

describe("CollectionHeader", () => {
    test("Renders correctly", async () => {
        jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
        const collectionMock = new CollectionDtoMock();
        jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionMock);

        const screen = render(<CollectionHeader />);

        await waitFor(() => expect(screen.getAllByText(collectionMock.name!)).toHaveLength(2));

        const images = screen.getAllByRole("img");
        expect(images.some((image) => image.getAttribute("alt") === "collection-image")).toBe(true);
        expect(images.some((image) => image.getAttribute("alt") === "collection-header")).toBe(true);
        expect(screen.getByText(translate("itemWithCount", { count: collectionMock.items })));
    });
});
