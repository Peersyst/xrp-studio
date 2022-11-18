import InformationField from "module/common/component/display/InformationField/InformationField";
import { render } from "test-utils";
import { screen } from "@testing-library/react";

describe("InformationField tests", () => {
    const TITLE = "title";
    const CHILDREN = "children";

    test("Renders correctly", () => {
        render(<InformationField title={TITLE}>{CHILDREN}</InformationField>);

        expect(screen.getByText("title:")).toBeInTheDocument();
        expect(screen.getByText("children")).toBeInTheDocument();
    });
});
