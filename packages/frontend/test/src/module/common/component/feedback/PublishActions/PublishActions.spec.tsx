import { act, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { NftPublishActionStep } from "module/common/component/feedback/PublishActions/PublishActions.types";
import PublishActions from "module/common/component/feedback/PublishActions/PublishActions";
import { render } from "test-utils";

describe("PublishActions tests", () => {
    const MOCK_STEPS: NftPublishActionStep[] = [
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
        const onSuccessMock = jest.fn();
        render(<PublishActions steps={MOCK_STEPS} onSuccess={onSuccessMock} />);

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
