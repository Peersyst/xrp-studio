import EditCollectionNftDraftHeader from "module/collection/component/layout/EditCollectionNftDraftHeader/EditCollectionNftDraftHeader";
import { render, translate } from "test-utils";
import * as ReactRouterDOM from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CollectionRoutes } from "module/collection/CollectionRouter";

describe("Test for EditCollectionNftDraftHeader", () => {
    test("Renders correctly", () => {
        const screen = render(<EditCollectionNftDraftHeader />);
        expect(screen.getByRole("heading", { name: translate("editNft") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("saveChanges") })).toBeInTheDocument();
        expect(screen.getByTestId("arrowIcon")).toBeInTheDocument();
    });
    test("Navigates to create collections page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDOM, "useNavigate").mockReturnValue(mockedNavigate);
        const screen = render(<EditCollectionNftDraftHeader />);
        const button = screen.getByTestId("arrowIcon");
        userEvent.click(button);
        expect(mockedNavigate).toHaveBeenCalledWith(CollectionRoutes.CREATE_COLLECTION);
    });
});
