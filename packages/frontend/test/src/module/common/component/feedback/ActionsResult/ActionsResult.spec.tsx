import { Fragment } from "react";
import ActionsResult from "module/common/component/feedback/ActionsResult/ActionsResult";
import { render } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("ActionsResult tests", () => {
    test("Renders correctly with type success", async () => {
        const MOCK_TITLE = "TITLE";
        const children = <Fragment />;

        render(
            <ActionsResult title={MOCK_TITLE} type="success">
                {children}
            </ActionsResult>,
        );

        await waitFor(() => expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument());
        expect(screen.queryByTestId("AlertCircleIcon")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
    });

    test("Renders correctly with type error", async () => {
        const MOCK_TITLE = "TITLE";
        const children = <Fragment />;

        render(
            <ActionsResult title={MOCK_TITLE} type="error">
                {children}
            </ActionsResult>,
        );

        await waitFor(() => expect(screen.getByTestId("AlertCircleIcon")).toBeInTheDocument());
        expect(screen.queryByTestId("CheckCircleIcon")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
    });
});
