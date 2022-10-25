import { capitalize } from "@peersyst/react-utils";
import { screen } from "@testing-library/react";
import DashboardPage from "module/dashboard/DashboardPage";
import { render, translate } from "test-utils";

describe("Login integration tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders the page", () => {
        render(<DashboardPage />);
        screen.getByRole("heading", { name: capitalize(translate("name")) });
    });
});
