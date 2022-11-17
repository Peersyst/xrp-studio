import { screen } from "@testing-library/react";
import { UseSearchParamsMock, UseNavigateMock, CollectionDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import DropCreationPage from "module/drop/page/DropCreationPage/DropCreationPage";
import { CollectionService } from "module/api/service";
import * as Router from "react-router-dom";

describe("DropCreationPage", () => {
    const useNavigateMock = new UseNavigateMock();

    beforeEach(() => {
        useNavigateMock.clear();
    });

    describe("Creation Drop", () => {
        let useSearchParamsMock: UseSearchParamsMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock();
        });

        afterAll(() => {
            useSearchParamsMock.restore();
        });

        test("Renders correctly", () => {
            jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
            const collectionMock = new CollectionDtoMock();
            jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionMock);

            render(<DropCreationPage />);

            // Header
            expect(screen.getByText(translate("customizeDropPage")));

            // Price
            expect(screen.getByPlaceholderText(translate("price"))).toBeInTheDocument();
        });
    });
});
