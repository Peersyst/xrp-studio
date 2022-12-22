import ActionStep from "module/common/component/feedback/ActionSteps/ActionStep/ActionStep";
import { render, translate } from "test-utils";
import { act, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("ActionStep", () => {
    const MOCK_STEP = {
        title: "STEP_1",
        description: "step_1_description",
        execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
    };
    const MOCK_WARNING_STEP = {
        title: "WARNING_STEP",
        description: "step_warning",
        execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
        warning: true,
        warningMessage: "This is a warning message",
    };
    const ERROR__MOCK_STEP = {
        title: "ERROR_STEP",
        description: "Error_step_description",
        execution: () => {
            throw new Error();
        },
    };

    test("Renders correctly being active ", async () => {
        const handleSuccess = jest.fn();
        render(<ActionStep stepNumber={1} step={MOCK_STEP} active={true} onSuccess={handleSuccess} onError={jest.fn()} />);

        expect(screen.getByText(MOCK_STEP.title)).toBeInTheDocument();
        expect(screen.getByText(MOCK_STEP.description)).toBeInTheDocument();
        await act(() => waitFor(() => expect(handleSuccess).toHaveBeenCalled()));
    });

    test("Renders correctly error", async () => {
        const handleError = jest.fn();
        render(<ActionStep stepNumber={1} step={ERROR__MOCK_STEP} active={true} onSuccess={jest.fn()} onError={handleError} />);

        expect(screen.queryByText(ERROR__MOCK_STEP.description)).toBeNull();
        expect(handleError).toHaveBeenCalled();
        expect(screen.getByText(translate("somethingWentWrong", { ns: "error" }))).toBeInTheDocument();
    });

    test("Renders correclty with warning step and not active", async () => {
        render(<ActionStep stepNumber={1} step={MOCK_WARNING_STEP} active={false} onSuccess={jest.fn()} onError={jest.fn()} />);

        expect(screen.getByText("This is a warning message")).toBeInTheDocument();
    });
});
