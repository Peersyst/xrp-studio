import LoadingLogo from "module/common/component/layout/LoadingLogo/LoadingLogo";
import { render } from "test-utils";
import { screen } from "@testing-library/react";

describe("LoadingLogo tests", () => {
    test("Renders correctly", () => {
        render(<LoadingLogo />);

        expect(screen.getByRole("img")).toHaveAttribute("alt", "xrp-studio-logo");
    });
});
