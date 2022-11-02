import { render, screen, translate } from "test-utils";
import { UseSearchParamsMock } from "test-mocks";
import CollectionCreationPageHeader from "module/collection/page/CollectionCreationPage/CollectionCreationPageHeader/CollectionCreationPageHeader";

describe("CollectionCreationPageHeader", () => {
    test("Renders create collection correctly", () => {
        render(<CollectionCreationPageHeader />);

        expect(screen.getByText(translate("createCollection")));
    });

    test("Renders edit collection correctly", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<CollectionCreationPageHeader />, { router: { path: "/collections/creation?id=1" } });

        expect(screen.getByText(translate("editCollection")));
    });

    test("Renders edit collection correctly loading", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<CollectionCreationPageHeader loading />, { router: { path: "/collections/creation?id=1" } });

        screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());
    });

    test("Renders edit collection correctly saving", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<CollectionCreationPageHeader saving />, { router: { path: "/collections/creation?id=1" } });

        expect(screen.getByRole("button", { name: translate("cancel") })).toBeDisabled();
        expect(screen.getByRole("button", { name: translate("publish") })).toBeDisabled();
    });

    test("Renders edit collection correctly publishing", () => {
        new UseSearchParamsMock({ id: "1" });
        render(<CollectionCreationPageHeader publishing />, { router: { path: "/collections/creation?id=1" } });

        expect(screen.getByRole("button", { name: translate("cancel") })).toBeDisabled();
        expect(screen.getByRole("button", { name: translate("save") })).toBeDisabled();
    });
});
