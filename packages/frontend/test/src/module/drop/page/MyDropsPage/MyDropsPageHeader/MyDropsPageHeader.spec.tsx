import { render, translate } from "test-utils";
import MyDropsPageHeader from "module/drop/page/MyDropsPage/MyDropsPageHeader/MyDropsPageHeader";
import { screen } from "@testing-library/react";

describe("MyDropsPageHeader tests", () => {
    test("Renders correctly", () => {
        render(<MyDropsPageHeader />);

        expect(screen.getByRole("heading", { name: translate("myDrops") })).toBeInTheDocument();
    });
});
