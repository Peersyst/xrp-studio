import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("NftPublishError", () => {
    const mockError = "THIS IS AN ERROR";
    test("Renders correctly", async () => {
        render(<NftPublishError error={mockError} />);

        await waitFor(() => expect(screen.getByTestId("AlertCircleIcon")).toBeInTheDocument());
        expect(screen.getByRole("heading", { name: translate("errorTitle") }));
        expect(screen.getByText(mockError)).toBeInTheDocument();
    });
});
