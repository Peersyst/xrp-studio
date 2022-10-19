import { screen } from "@testing-library/react";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { render, translate } from "test-utils";
import { NftDtoMock } from "test-mocks";

describe("BaseNftPage", () => {
    test("Renders correctly", () => {
        const nftMock = new NftDtoMock();

        render(<BaseNftPage header={<>header</>} nft={nftMock} />);

        // header
        expect(screen.getByText("header")).toBeInTheDocument();

        // Content
        expect(screen.getByText(translate("name"))).toBeInTheDocument();
        expect(screen.getByDisplayValue(nftMock.metadata!.name!)).toBeInTheDocument();
    });
});
