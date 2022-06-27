import { screen, waitFor } from "@testing-library/react";
import DashboardPage from "module/dashboard/DashboardPage";
import { FailApiCall, render, SuccessApiCall } from "test-utils";
import * as Login from "module/auth/utils/loginCall";
import * as Recoil from "recoil";
import userEvent from "@testing-library/user-event";
import { RecoilState, useRecoilState } from "recoil";

describe("Login integration tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders the page", () => {
        render(<DashboardPage />);
        screen.getByRole("heading", { name: "Charlie" });
        expect(screen.getByRole("button", { name: "Log in" }));
        expect(screen.getByTestId("ArrowIcon"));
    });

    test("Log in succeeds", async () => {
        jest.spyOn(Login, "loginCall").mockImplementation(() => SuccessApiCall({ auth_token: "test_token" }));

        render(<DashboardPage />);
        const button = screen.getByRole("button", { name: "Log in" });
        userEvent.click(button);
        await waitFor(() => expect(screen.getByRole("button", { name: "Log out" })));
    });

    test("Log in fails", async () => {
        jest.spyOn(Login, "loginCall").mockImplementation(() => FailApiCall({ code: 403, message: "Invalid credentials" }));

        render(<DashboardPage />);
        const button = screen.getByRole("button", { name: "Log in" });
        userEvent.click(button);
        await waitFor(() => expect(screen.getByText(JSON.stringify({ code: 403, message: "Invalid credentials" }))));
    });

    test("Log out", async () => {
        const setAuthState = jest.fn();

        jest.spyOn(Recoil, "useRecoilState").mockImplementation((atom: RecoilState<unknown>) => {
            if (atom.key === "authState") {
                return [{ token: "auth_token", isLogged: true }, setAuthState];
            } else {
                return useRecoilState(atom);
            }
        });

        render(<DashboardPage />);
        const button = screen.getByRole("button", { name: "Log out" });
        userEvent.click(button);
        expect(setAuthState).toHaveBeenCalledWith({ token: undefined, isLogged: false });
    });
});
