import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import DropCost from "module/drop/component/display/DropCost/DropCost";

describe("DropCost", () => {
    test("Renders correctly", () => {
        render(<DropCost items={4} />);
        expect(screen.getByText(translate("dropMintingCost") + ":")).toBeInTheDocument();
        expect(screen.getByText("16")).toBeInTheDocument();
        expect(screen.getByTestId("XrpIcon")).toBeInTheDocument();
    });
});
