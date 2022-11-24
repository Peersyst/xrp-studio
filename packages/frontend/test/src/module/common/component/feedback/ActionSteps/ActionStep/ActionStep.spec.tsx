import ActionStep from "module/common/component/feedback/ActionSteps/ActionStep/ActionStep";
import { render } from "test-utils";
import { act, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("ActionStep", () => {
    const MOCK_STEP = {
        title: "STEP_1",
        description: "step_1_description",
        execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
    };

    test("Renders correctly being active ", async () => {
        const onSuccessMock = jest.fn();
        render(<ActionStep stepNumber={1} step={MOCK_STEP} active={true} onSuccess={onSuccessMock} />);

        expect(screen.getByText(MOCK_STEP.title)).toBeInTheDocument();
        expect(screen.getByText(MOCK_STEP.description)).toBeInTheDocument();
        await act(() => waitFor(() => expect(onSuccessMock).toHaveBeenCalled()));
    });
});
