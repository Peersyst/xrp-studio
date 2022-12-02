import NftPublishActions from "module/nft/component/feedback/NftPublishModal/NftPublishActions/NftPublishActions";
import { render, translate } from "test-utils";
import { CreateNftDraftRequestMock, NftDtoMock, UseCheckBalanceMock } from "test-mocks";
import { NftService } from "module/api/service";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/dom";
import { UseNftStatePollingMock } from "test-mocks";

describe("NftPublishActions tests", () => {
    const nftDtoMock = new NftDtoMock();
    const requestMock = new CreateNftDraftRequestMock();
    const onSuccessMock = jest.fn();
    const onPollingEndMock = jest.fn();

    let useCheckBalanceMock: UseCheckBalanceMock;
    let createNftMock: jest.SpyInstance;
    let useNftStatePolling: UseNftStatePollingMock;

    beforeEach(() => {
        useCheckBalanceMock = new UseCheckBalanceMock();
        createNftMock = jest.spyOn(NftService, "nftControllerCreateNft").mockResolvedValue(nftDtoMock);
        useNftStatePolling = new UseNftStatePollingMock();
    });

    afterAll(() => {
        useCheckBalanceMock.restore();
        createNftMock.mockRestore();
        useNftStatePolling.restore();
    });

    test("Renders correclty", async () => {
        render(<NftPublishActions request={requestMock} onSuccess={onSuccessMock} onPollingEnd={onPollingEndMock} />);

        await act(() => waitFor(() => expect(useCheckBalanceMock.checkBalance).toHaveBeenCalled()));
        await act(() => waitFor(() => expect(createNftMock).toHaveBeenCalled()));
        await act(() => waitFor(() => expect(useNftStatePolling.mock).toHaveBeenCalled()));

        expect(screen.getByText(translate("publishNftProcessingStepTitle")));
        expect(screen.getByText(translate("publishNftProcessingStepDescription")));
        expect(screen.getByText(translate("publishNftAddingToBlockchainStepTitle")));
        expect(screen.getByText(translate("publishNftAddingToBlockchainStepDescription")));
        expect(screen.getByText(translate("publishNftSuccessStepTitle")));
        expect(screen.getByText(translate("publishNftSuccessStepDescription")));

        await act(() => waitFor(() => expect(screen.getAllByTestId("CheckCircleIcon")).toHaveLength(3)));
    });
});
