import { screen } from "@testing-library/react";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { render } from "test-utils";
import { DropDtoMock } from "../../../../../../__mocks__/dto/drop.dto.mock";

describe("DropLanding", () => {
    test("Renders correctly with all properties", () => {
        const dropDtoMock = new DropDtoMock();

        render(<DropLanding drop={dropDtoMock} />);

        // Description section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.name })).toBeInTheDocument();
        // Video section
        expect(screen.getByTestId("Player")).toHaveAttribute("data-url", dropDtoMock.videoUrl);
        // Artist section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.user.name })).toBeInTheDocument();
    });

    test("Renders correctly without optional properties", () => {
        const dropDtoMock = new DropDtoMock({ videoUrl: null as any });

        render(<DropLanding drop={dropDtoMock} />);

        // Description section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.name })).toBeInTheDocument();
        // Video section
        expect(screen.queryByTestId("Player")).toBeNull();
        // Artist section
        expect(screen.getByRole("heading", { name: dropDtoMock.collection.user.name })).toBeInTheDocument();
    });
});
