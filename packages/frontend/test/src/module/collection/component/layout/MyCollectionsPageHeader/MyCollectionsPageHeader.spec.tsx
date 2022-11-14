import { act, render, translate, waitFor } from "test-utils";
import MyCollectionsPageHeader from "module/collection/component/layout/MyCollectionsPageHeader/MyCollectionsPageHeader";
import * as ReactRouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { UseFilterMock } from "test-mocks";

describe("Test for MyCollectionsPageHeader", () => {
    test("Renders correctly", () => {
        const screen = render(<MyCollectionsPageHeader />);
        expect(screen.getByRole("heading", { name: translate("myCollections") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("createCollection") })).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });
    test("Navigates to the create collection page", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        const screen = render(<MyCollectionsPageHeader />);
        const button = screen.getByRole("button", { name: translate("createCollection") });
        userEvent.click(button);
        expect(mockedNavigate).toHaveBeenCalledWith(CollectionRoutes.CREATE_COLLECTION);
    });
    test("Update the query filter correctly", async () => {
        const { setFilter } = new UseFilterMock();
        const screen = render(<MyCollectionsPageHeader />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", translate("search"));
        expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
        userEvent.type(input, "test");
        await act(async () => {
            await waitFor(() => expect(setFilter).toHaveBeenCalledWith("test"));
        });
    });
});
