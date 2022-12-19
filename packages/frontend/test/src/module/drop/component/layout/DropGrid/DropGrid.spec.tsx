import { PaginatedDropMock } from "test-mocks";
import DropGrid from "module/drop/component/layout/DropGrid/DropGrid";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("DropGrid tests", () => {
    test("Renders correctly with drops", () => {
        const dropMocks = new PaginatedDropMock({ dropParams: { length: 10 } });
        render(<DropGrid data={dropMocks} loading={false} callback={() => undefined} end={false} />);
        expect(screen.getAllByText("collection_name")).toHaveLength(10);
    });

    test("Renders correctly without drops", () => {
        const dropMocks = new PaginatedDropMock();
        render(<DropGrid data={dropMocks} loading={false} callback={() => undefined} end={false} />);
        expect(screen.getByRole("heading", { name: translate("youHaveNoDrops", { ns: "error" }) }));
    });
});
