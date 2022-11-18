import { screen } from "@testing-library/react";
import { render } from "test-utils";
import NftCardSkeleton from "module/nft/component/feedback/NftCardSkeleton/NftCardSkeleton";

describe("NftCardSkeleton", () => {
    test("Renders correctly", () => {
        render(<NftCardSkeleton />);

        expect(screen.getByText("NFT name loading")).toBeInTheDocument();
    });
});
