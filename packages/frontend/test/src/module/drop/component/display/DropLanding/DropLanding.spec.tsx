import { screen } from "@testing-library/react";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { render } from "test-utils";
import { DropDtoMock } from "test-mocks";

describe("DropLanding", () => {
    test("Renders correctly", () => {
        const dropDtoMock = new DropDtoMock();

        render(<DropLanding drop={dropDtoMock} />);

        // Description section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.name }));
    });
});
