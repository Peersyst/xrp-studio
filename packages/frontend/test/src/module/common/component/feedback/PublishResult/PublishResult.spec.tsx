import { render } from "test-utils";
import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Fragment } from "react";
import { screen } from "@testing-library/react";

describe("PublishResult tests", () => {
    const MOCK_TITLE = "TITLE";
    const MOCK_CHILDREN = <Fragment></Fragment>;

    test("Renders correctly with type success", () => {
        render(
            <PublishResult title={MOCK_TITLE} type="success">
                {MOCK_CHILDREN}
            </PublishResult>,
        );

        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
        expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
    });

    test("Renders correctly with type success", () => {
        render(
            <PublishResult title={MOCK_TITLE} type="error">
                {MOCK_CHILDREN}
            </PublishResult>,
        );

        expect(screen.getByRole("heading", { name: MOCK_TITLE })).toBeInTheDocument();
        expect(screen.getByTestId("AlertCircleIcon")).toBeInTheDocument();
    });
});
