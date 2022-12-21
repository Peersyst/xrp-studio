import MyDropsPageContent from "module/drop/page/MyDropsPage/MyDropsPageContent/MyDropsPageContent";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("MyDropsPageContent tests", () => {
    test("Renders correctly", async () => {
        render(<MyDropsPageContent />);

        expect(screen.getByRole("heading", { name: translate("youHaveNoDrops", { ns: "error" }) })).toBeInTheDocument();
    });
});
