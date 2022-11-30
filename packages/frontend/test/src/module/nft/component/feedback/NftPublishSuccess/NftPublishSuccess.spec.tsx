import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { NftDtoMock } from "test-mocks";
import { NftService } from "module/api/service";

describe("NftPublishSuccess test", () => {
    const nftMock = new NftDtoMock({
        transferFee: 0,
    });
    let getNftMock: jest.SpyInstance;

    beforeAll(() => {
        getNftMock = jest.spyOn(NftService, "nftControllerGetNft").mockResolvedValue(nftMock);
    });

    afterAll(() => {
        getNftMock.mockRestore();
    });

    test("Renders correctly", async () => {
        render(<NftPublishSuccess id={0} />);

        await waitFor(() => expect(screen.queryByTestId("LoaderIcon")).not.toBeInTheDocument());
        await waitFor(() => expect(getNftMock).toHaveBeenCalled());
        await waitFor(() => expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument());

        expect(screen.getByRole("heading", { name: translate("publishNftSuccessStepTitle") })).toBeInTheDocument();
        expect(screen.getByText(translate("mintTransactionHash"))).toBeInTheDocument();
        expect(screen.getByText(translate("tokenId"))).toBeInTheDocument();
        expect(screen.getByText(translate("transferFeeCost"))).toBeInTheDocument();
    });
});
