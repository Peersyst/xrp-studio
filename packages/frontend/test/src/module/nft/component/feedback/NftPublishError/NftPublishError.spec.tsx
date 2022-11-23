import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("NftPublishError", () => {
    test("Renders correctly", async () => {
        render(<NftPublishError />);

        await waitFor(() => expect(screen.getByTestId("AlertCircleIcon")).toBeInTheDocument());
        expect(screen.getByRole("heading", { name: translate("errorTitle") }));
    });
});
