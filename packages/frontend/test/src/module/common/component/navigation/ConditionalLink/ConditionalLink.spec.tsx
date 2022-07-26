import { screen } from "@testing-library/react";
import { render } from "test-utils";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

describe("ConditionalLink tests", () => {
    test("Renders link", () => {
        render(
            <ConditionalLink condition={true} to={"/test"}>
                Link
            </ConditionalLink>,
        );

        expect(screen.getByRole("link", { name: "Link" })).toBeInTheDocument();
    });

    test("Renders fragment", () => {
        render(
            <ConditionalLink condition={false} to={"/test"}>
                Fragment
            </ConditionalLink>,
        );

        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        expect(screen.getByText("Fragment")).toBeInTheDocument();
    });
});
