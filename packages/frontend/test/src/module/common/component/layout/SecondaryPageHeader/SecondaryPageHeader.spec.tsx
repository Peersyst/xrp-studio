import SecondaryPageHeader from "module/common/component/layout/SecondaryPageHeader/SecondaryPageHeader";
import { render } from "test-utils";

describe("Test for the SecondaryPageComponent", () => {
    test("Renders correctly", () => {
        const { getByRole, getByText } = render(
            <SecondaryPageHeader title={"title"} complement={<>complement</>} bottomComponent={<>bottomComponent</>} />,
        );
        expect(getByRole("heading", { name: "title" })).toBeInTheDocument();
        expect(getByText("complement")).toBeInTheDocument();
        expect(getByText("bottomComponent")).toBeInTheDocument();
    });
});
