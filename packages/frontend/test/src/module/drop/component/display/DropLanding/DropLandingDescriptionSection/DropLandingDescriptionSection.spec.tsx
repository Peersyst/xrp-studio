import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { DropMock } from "../../../../../../../__mocks__/drop/Drop.mock";

describe("DropLandingDescriptionSection", () => {
    test("Renders correctly", () => {
        const dropMock = new DropMock();
        const salesMock = "120";

        render(
            <DropLandingDescriptionSection
                image={dropMock.image}
                name={dropMock.name}
                description={dropMock.description}
                items={dropMock.items}
                sold={dropMock.sold}
                sales={salesMock}
                fontLuminance={1}
            />,
        );

        // Name
        expect(screen.getByText(dropMock.name)).toBeInTheDocument();
        // Description
        expect(screen.getByText(dropMock.description!)).toBeInTheDocument();
        // Items
        expect(screen.getByText(translate("items"))).toBeInTheDocument();
        expect(screen.getByText(dropMock.items)).toBeInTheDocument();
        // Sold
        expect(screen.getByText(translate("sold"))).toBeInTheDocument();
        expect(screen.getByText(dropMock.sold)).toBeInTheDocument();
        // Sales
        expect(screen.getByText(translate("sales"))).toBeInTheDocument();
        expect(screen.getByText(salesMock)).toBeInTheDocument();
        // Image
        expect(screen.getByAltText(`${dropMock.name}-image`)).toHaveAttribute("src", dropMock.image);
    });
});
