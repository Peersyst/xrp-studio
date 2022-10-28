import { screen } from "@testing-library/react";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { render } from "test-utils";

describe("BaseNftPage", () => {
    test("Renders correctly", () => {
        render(<BaseNftPage>{{ header: <>header</>, content: <></> }}</BaseNftPage>);

        // header
        expect(screen.getByText("header")).toBeInTheDocument();
    });
});
