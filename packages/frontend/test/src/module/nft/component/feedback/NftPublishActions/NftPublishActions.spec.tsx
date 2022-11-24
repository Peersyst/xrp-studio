import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import NftPublishActions from "module/nft/component/feedback/NftPublishActions/NftPublishActions";

describe("NftPublishActions tests", () => {
    test("Renders correctly", async () => {
        render(<NftPublishActions />);

        expect(screen.getByRole("heading", { name: translate("creationSteps") })).toBeInTheDocument();
    });
});
