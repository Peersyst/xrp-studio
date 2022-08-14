import { screen } from "@testing-library/react";
import { render } from "test-utils";
import Avatar from "module/common/component/display/Avatar/Avatar";

describe("Avatar", () => {
    test("Renders correctly default", () => {
        render(<Avatar img="img" alt="alt" />);
        expect(screen.getByRole("img")).toHaveAttribute("alt", "alt");
    });

    test("Renders correctly lg", () => {
        render(<Avatar img="img" alt="alt" size="lg" />);
        expect(screen.getByRole("img")).toHaveAttribute("alt", "alt");
    });

    test("Renders correctly md", () => {
        render(<Avatar img="img" alt="alt" size="md" />);
        expect(screen.getByRole("img")).toHaveAttribute("alt", "alt");
    });

    test("Renders correctly sm", () => {
        render(<Avatar img="img" alt="alt" size="sm" />);
        expect(screen.getByRole("img")).toHaveAttribute("alt", "alt");
    });
});
