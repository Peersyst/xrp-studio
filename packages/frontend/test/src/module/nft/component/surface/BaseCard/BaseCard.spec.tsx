import { screen } from "@testing-library/react";
import { render } from "test-utils";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";

describe("BaseCard", () => {
    test("Renders correctly without note", () => {
        render(<BaseCard defaultUrl="cover" title="title" to="to" />);
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/to");
    });

    test("Renders correctly with note", () => {
        render(<BaseCard defaultUrl="cover" title="title" to="to" note="note" />);
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("note")).toBeInTheDocument();
    });

    test("Renders correctly with children", () => {
        render(
            <BaseCard defaultUrl="cover" title="title" to="to" note="note">
                children
            </BaseCard>,
        );
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("note")).toBeInTheDocument();
        expect(screen.getByText("children")).toBeInTheDocument();
    });
});
