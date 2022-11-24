import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionPublishInformation from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishInformation/CollectionPublishInformation";
import { capitalize } from "@peersyst/react-utils";

describe("CollectionPublishInformation", () => {
    test("Renders correctly", () => {
        const name = "collection-name";
        const items = 10;

        render(<CollectionPublishInformation name={name} items={items} />);

        expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();

        expect(screen.getByText(capitalize(translate("items")))).toBeInTheDocument();
        expect(screen.getByText(items)).toBeInTheDocument();
    });
});
