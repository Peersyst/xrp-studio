import ExploreCollectionsGrid from "module/explore/component/display/ExploreCollectionsGrid/ExploreCollectionsGrid";
import { render, translate } from "test-utils";
import { CollectionService } from "module/api/service";
import { CollectionDtoMock, CollectionsDtoMock, PaginatedDataMock } from "test-mocks";
import { waitFor } from "@testing-library/dom";
import { screen } from "@testing-library/react";

describe("ExploreCollectionsGrid tests", async () => {
    test("Renders correctly with collections", async () => {
        const { collections } = new CollectionsDtoMock({ length: 10 });
        const collectionPaginatedMock = new PaginatedDataMock<CollectionDtoMock[]>({ items: collections });
        const collectionControllerGetCollectionsMock = jest
            .spyOn(CollectionService, "collectionControllerGetCollections")
            .mockResolvedValue(collectionPaginatedMock);
        render(<ExploreCollectionsGrid />);

        await waitFor(() => expect(collectionControllerGetCollectionsMock).toHaveBeenCalled());
    });

    test("Renders correctly without collections", async () => {
        const { collections } = new CollectionsDtoMock({ length: 0 });
        const collectionPaginatedMock = new PaginatedDataMock<CollectionDtoMock[]>({ items: collections });
        const collectionControllerGetCollectionsMock = jest
            .spyOn(CollectionService, "collectionControllerGetCollections")
            .mockResolvedValue(collectionPaginatedMock);
        render(<ExploreCollectionsGrid />);

        await waitFor(() => expect(collectionControllerGetCollectionsMock).toHaveBeenCalled());
        await waitFor(() =>
            expect(screen.getByRole("heading", { name: translate("noCollectionsAvailable", { ns: "error" }) })).toBeInTheDocument(),
        );
    });
});
