import { act, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import { render } from "test-utils";

describe("ActionSteps", () => {
    const MOCK_STEPS: Step[] = [
        {
            title: "STEP_1",
            description: "step_1_description",
            execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
        },
        {
            title: "STEP_2",
            description: "step_2_description",
            execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
        },
        {
            title: "STEP_3",
            description: "step_3_description",
            execution: jest.fn(async () => new Promise<void>((resolve) => resolve())),
        },
    ];

    test("Renders correctly", async () => {
        render(<ActionSteps steps={MOCK_STEPS} />);

        expect(screen.getByText(MOCK_STEPS[0].title)).toBeInTheDocument();
        expect(screen.getByText(MOCK_STEPS[0].description)).toBeInTheDocument();
        expect(MOCK_STEPS[0].execution).toHaveBeenCalled();
        await act(() => waitFor(() => expect(screen.getAllByTestId("CheckCircleIcon")).toHaveLength(1)));

        expect(screen.getByText(MOCK_STEPS[1].title)).toBeInTheDocument();
        expect(screen.getByText(MOCK_STEPS[1].description)).toBeInTheDocument();
        await waitFor(() => expect(MOCK_STEPS[1].execution).toHaveBeenCalled());

        expect(screen.getByText(MOCK_STEPS[2].title)).toBeInTheDocument();
        expect(screen.getByText(MOCK_STEPS[2].description)).toBeInTheDocument();
        expect(MOCK_STEPS[2].execution).toHaveBeenCalled();
        await act(() => waitFor(() => expect(screen.getAllByTestId("CheckCircleIcon")).toHaveLength(3)));
    });
});
