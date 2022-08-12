import SecondaryPage from "module/common/component/layout/SecondaryPage/SecondaryPage";
import { render } from "test-utils";

describe("Test for the secondary page", () => {
    test("Renders correctly", () => {
        const { getByRole, getByText } = render(
            <SecondaryPage title={"title"}>
                {{ complement: <>complement</>, bottomComponent: <>bottomComponent</>, content: <>content</> }}
            </SecondaryPage>,
        );
        expect(getByRole("heading", { name: "title" })).toBeInTheDocument();
        expect(getByText("complement")).toBeInTheDocument();
        expect(getByText("content")).toBeInTheDocument();
        expect(getByText("bottomComponent")).toBeInTheDocument();
    });
});
