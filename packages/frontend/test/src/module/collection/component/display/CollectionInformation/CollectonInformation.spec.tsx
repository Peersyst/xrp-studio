import { screen } from "@testing-library/react";
import { render } from "test-utils";
import CollectionInformation from "module/collection/component/display/CollectionInformation/CollectionInformation";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import { capitalize } from "@peersyst/react-utils";

describe("CollectionInformation", () => {
    test("Renders correctly", () => {
        const header = "collection-header";
        const image = "collection-image";
        const name = "collection-name";
        const items = 10;
        const additionalField: InformationField = {
            label: "additional-label",
            content: "additional-content",
        };

        render(<CollectionInformation header={header} image={image} name={name} items={items} additionalFields={[additionalField]} />);

        expect(screen.getByAltText(header)).toBeInTheDocument();
        expect(screen.getByAltText(image)).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(items)).toBeInTheDocument();
        expect(screen.getByText(capitalize(additionalField.label))).toBeInTheDocument();
        expect(screen.getByText(additionalField.content as string)).toBeInTheDocument();
    });
});
