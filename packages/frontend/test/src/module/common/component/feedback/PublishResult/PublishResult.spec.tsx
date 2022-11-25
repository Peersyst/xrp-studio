import { Fragment } from "react";
import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { render } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("PublishResult tests", () => {
    test("Renders correctly with type success", async () => {
        const MOCK_TITLE = "TITLE";
        const children = <Fragment />;

        render(
            <PublishResult title={MOCK_TITLE} type="success">
                {children}
            </PublishResult>,
        );

        await waitFor(() => expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument());
        expect(screen.queryByTestId("AlertCircleIcon")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
    });

    test("Renders correctly with type error", async () => {
        const MOCK_TITLE = "TITLE";
        const children = <Fragment />;

        render(
            <PublishResult title={MOCK_TITLE} type="error">
                {children}
            </PublishResult>,
        );

        await waitFor(() => expect(screen.getByTestId("AlertCircleIcon")).toBeInTheDocument());
        expect(screen.queryByTestId("CheckCircleIcon")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
    });
});
