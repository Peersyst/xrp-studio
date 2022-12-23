import { screen } from "@testing-library/react";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import { capitalize } from "@peersyst/react-utils";
import { render } from "test-utils";
import DropInformation from "module/drop/component/display/DropInformation/DropInformation";

describe("DropInformation", function () {
    test("Renders correctly", () => {
        const header = "collection-header";
        const image = "collection-image";
        const name = "collection-name";
        const items = 10;
        const price = "100";
        const additionalField: InformationField = {
            label: "additional-label",
            content: "additional-content",
        };

        render(
            <DropInformation price={price} header={header} image={image} name={name} items={items} additionalFields={[additionalField]} />,
        );

        expect(screen.getByAltText(header)).toBeInTheDocument();
        expect(screen.getByAltText(image)).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(items)).toBeInTheDocument();
        expect(screen.getByText(price)).toBeInTheDocument();
        expect(screen.getByText(capitalize(additionalField.label))).toBeInTheDocument();
        expect(screen.getByText(additionalField.content as string)).toBeInTheDocument();
    });
});
