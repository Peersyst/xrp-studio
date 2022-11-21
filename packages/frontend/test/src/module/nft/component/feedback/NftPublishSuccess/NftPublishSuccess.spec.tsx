import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";

describe("NftPublishSuccess test", () => {
    test("Renders correctly", () => {
        render(<NftPublishSuccess />);

        expect(screen.getByRole("heading", { name: translate("successTitle") })).toBeInTheDocument();
        expect(screen.getByText(translate("hashTransactionCreation") + ":")).toBeInTheDocument();
        expect(screen.getByText(translate("tokenId") + ":")).toBeInTheDocument();
        expect(screen.getByText(translate("transferFeeCost") + ":")).toBeInTheDocument();
    });
});
