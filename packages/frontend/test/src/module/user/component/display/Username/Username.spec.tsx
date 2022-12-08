import { screen } from "@testing-library/react";
import { render } from "test-utils";
import Username from "module/user/component/Username/Username";

describe("Username", () => {
    const name = "username";

    test("Renders correctly not verified", () => {
        render(<Username variant="body1" name={name} verified={false} />);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.queryByTestId("VerifiedIcon")).toBeNull();
    });

    test("Renders correctly verified", () => {
        render(<Username variant="body1" name={name} verified={true} />);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByTestId("VerifiedIcon")).toBeInTheDocument();
    });
});
