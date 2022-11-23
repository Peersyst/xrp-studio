import { screen } from "@testing-library/react";
import { render } from "test-utils";
import CollectionCover from "module/collection/component/display/CollectionCover/CollectionCover";

describe("CollectionCover", () => {
    test("Renders correctly", () => {
        render(<CollectionCover header="header" image="image" />);

        expect(screen.getByAltText("collection-header")).toBeInTheDocument();
        expect(screen.getByAltText("collection-image")).toBeInTheDocument();
    });
});
