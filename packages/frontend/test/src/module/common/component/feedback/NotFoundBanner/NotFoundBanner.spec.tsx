import NotFoundBanner from "module/common/component/feedback/NotFoundBanner/NotFoundBanner";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("NotFoundBanner tests", () => {
    test("Renders correctly", () => {
        render(<NotFoundBanner />);

        expect(screen.getByRole("img")).toHaveAttribute("alt", "xrp-studio-logo");
        expect(screen.getByRole("heading", { name: "404 " + translate("notFound", { ns: "error" }) })).toBeInTheDocument();
        expect(screen.getByText(translate("content404", { ns: "error" }))).toBeInTheDocument();
    });
});
