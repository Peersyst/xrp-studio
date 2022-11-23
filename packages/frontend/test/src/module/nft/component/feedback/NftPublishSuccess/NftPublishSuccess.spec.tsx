import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

describe("NftPublishSuccess test", () => {
    test("Renders correctly", async () => {
        render(<NftPublishSuccess />);

        await waitFor(() => expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument());
        expect(screen.getByRole("heading", { name: translate("successTitle") })).toBeInTheDocument();
        expect(screen.getByText(translate("hashTransactionCreation") + ":")).toBeInTheDocument();
        expect(screen.getByText(translate("tokenId") + ":")).toBeInTheDocument();
        expect(screen.getByText(translate("transferFeeCost") + ":")).toBeInTheDocument();
    });
});
