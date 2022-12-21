import DropCard from "module/drop/component/display/DropCard/DropCard";
import { render, translate } from "test-utils";
import { DropDtoMock } from "test-mocks";
import { screen } from "@testing-library/react";

describe("DropCard", () => {
    test("Renders correctly", () => {
        const dropMock = new DropDtoMock();
        render(<DropCard size="lg" drop={dropMock} />);

        expect(screen.getByText("collection_name")).toBeInTheDocument();
        expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "drop-cover");
        expect(screen.getAllByRole("img")[1]).toHaveAttribute("alt", "drop-image");
        expect(screen.getByText(translate("itemWithCount", { count: 1000 }) + " · XRP 100 " + translate("mintPrice"))).toBeInTheDocument();
    });
});
