import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import DropLandingDescriptionSection from "module/drop/component/display/DropLanding/DropLandingDescriptionSection/DropLandingDescriptionSection";
import { DropDtoMock } from "../../../../../../../__mocks__/dto/drop.dto.mock";

describe("DropLandingDescriptionSection", () => {
    test("Renders correctly", () => {
        const dropMock = new DropDtoMock();

        render(
            <DropLandingDescriptionSection
                image={dropMock.collection.image}
                name={dropMock.collection.name}
                description={dropMock.collection.description}
                items={dropMock.collection.items}
                price={dropMock.price}
                sold={dropMock.sold}
                loading={false}
            />,
        );

        // Name
        expect(screen.getByText(dropMock.collection.name!)).toBeInTheDocument();
        // Description
        expect(screen.getByText(dropMock.collection.description!)).toBeInTheDocument();
        // Items
        expect(screen.getByText(translate("items"))).toBeInTheDocument();
        expect(screen.getByText(dropMock.collection.items)).toBeInTheDocument();
        // Sold
        expect(screen.getByText(translate("sold"))).toBeInTheDocument();
        expect(screen.getByText(dropMock.sold)).toBeInTheDocument();
        // Sales
        expect(screen.getByText(translate("sales"))).toBeInTheDocument();
        expect(
            screen.getByText(translate("formatNumber", { val: (BigInt(dropMock.price) * BigInt(dropMock.sold)).toString() })),
        ).toBeInTheDocument();
        // Image
        expect(screen.getByAltText(`${dropMock.collection.name}-image`)).toHaveAttribute("src", dropMock.collection.image);
    });
});
