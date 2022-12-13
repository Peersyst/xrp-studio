import { render, translate } from "test-utils";
import MyCollectionsPageHeader from "module/collection/component/layout/MyCollectionsPageHeader/MyCollectionsPageHeader";
import * as ReactRouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import * as recoil from "recoil";

describe("Test for MyCollectionsPageHeader", () => {
    test("Renders correctly", () => {
        const screen = render(<MyCollectionsPageHeader />);
        expect(screen.getByRole("heading", { name: translate("myCollections") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("createCollection") })).toBeInTheDocument();
    });
    test("Navigates to the create collection page", () => {
        const mockedNavigate = jest.fn();
        const mockedResetRecoilState = jest.fn();
        jest.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockedNavigate);
        jest.spyOn(recoil, "useResetRecoilState").mockReturnValue(mockedResetRecoilState);

        const screen = render(<MyCollectionsPageHeader />);

        const button = screen.getByRole("button", { name: translate("createCollection") });
        userEvent.click(button);

        expect(mockedResetRecoilState).toHaveBeenCalled();
        expect(mockedNavigate).toHaveBeenCalledWith(CollectionRoutes.CREATE_COLLECTION);
    });
});
