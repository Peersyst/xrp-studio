import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("NftPublishActions tests", () => {
    const MOCK_STEPS = [
        {
            title: "STEP_1",
            description: "step_1_description",
            execution: async () => {
                return undefined;
            },
        },
        {
            title: "STEP_2",
            description: "step_2_description",
            execution: async () => {
                return undefined;
            },
        },
        {
            title: "STEP_3",
            description: "step_3_description",
            execution: async () => {
                return undefined;
            },
        },
    ];

    test("Renders correctly", () => {
        render(<NftPublishActions steps={MOCK_STEPS} />);

        expect(screen.getByRole("heading", { name: translate("creationSteps") + ":" })).toBeInTheDocument();
        expect(screen.getByText("STEP_1")).toBeInTheDocument();
        expect(screen.getByText("step_1_description")).toBeInTheDocument();
        expect(screen.getByText("STEP_2")).toBeInTheDocument();
        expect(screen.getByText("step_2_description")).toBeInTheDocument();
        expect(screen.getByText("STEP_3")).toBeInTheDocument();
        expect(screen.getByText("step_3_description")).toBeInTheDocument();
    });
});
