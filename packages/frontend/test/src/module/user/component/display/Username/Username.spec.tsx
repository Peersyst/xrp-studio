import { screen } from "@testing-library/react";
import { render } from "test-utils";
import Username from "module/user/component/Username/Username";

describe("Username", () => {
    const name = "username";

    test("Renders correctly", () => {
        render(<Username variant="body1" name={name} />);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.queryByTestId("VerifiedIcon")).toBeNull();
    });
});
