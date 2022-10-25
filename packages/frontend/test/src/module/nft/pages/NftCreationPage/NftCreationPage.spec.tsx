import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import NftCreationPage from "module/nft/pages/NftCreationPage";
import userEvent from "@testing-library/user-event";
import { NftService } from "module/api/service";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { NftDtoMock } from "test-mocks";
import { waitFor } from "@testing-library/dom";
import Color from "color";
import { UseSearchParamsMock } from "../../../../../__mocks__/router/useSearchParams.mock";
import parseFlags from "module/nft/util/parseFlags";

describe("NftCreationPage", () => {
    const nftDraftMock = new NftDtoMock({ status: "draft" });
    const nftDraftMockFlags = parseFlags(nftDraftMock.flags);
    const nftDraftMockMetadata = nftDraftMock.metadata;

    const NFT_NAME = "Name";
    const CREATE_NFT_REQUEST = createNftRequestFromForm({
        name: NFT_NAME,
        burnable: false,
        onlyXRP: false,
        trustLine: false,
        transferable: false,
        backgroundColor: new Color(),
        attributes: [],
    });
    const UPDATE_NFT_REQUEST = createNftRequestFromForm({
        name: NFT_NAME,
        issuer: nftDraftMock.issuer,
        collection: nftDraftMock.collection?.id.toString(),
        transferFee: nftDraftMock.transferFee?.toString(),
        description: nftDraftMockMetadata?.description,
        image: nftDraftMockMetadata?.image,
        burnable: !!nftDraftMockFlags.burnable,
        onlyXRP: !!nftDraftMockFlags.onlyXRP,
        trustLine: !!nftDraftMockFlags.trustLine,
        transferable: !!nftDraftMockFlags.transferable,
        backgroundColor: new Color(nftDraftMockMetadata?.backgroundColor),
        externalUrl: nftDraftMockMetadata?.externalUrl,
        attributes: nftDraftMockMetadata?.attributes,
    });

    test("Create an NFT draft", async () => {
        const createNftDraftMock = jest.spyOn(NftService, "nftControllerCreateNftDraft").mockResolvedValueOnce(new NftDtoMock());

        render(<NftCreationPage />);

        userEvent.type(screen.getByPlaceholderText(translate("namePlaceholder")), NFT_NAME);
        userEvent.click(screen.getByRole("button", { name: translate("save") }));

        await waitFor(() => expect(createNftDraftMock).toHaveBeenCalledWith(CREATE_NFT_REQUEST));
    });

    test("Create published NFT", async () => {
        const createNftMock = jest.spyOn(NftService, "nftControllerCreateNft").mockResolvedValueOnce(new NftDtoMock());

        render(<NftCreationPage />);

        userEvent.type(screen.getByPlaceholderText(translate("namePlaceholder")), NFT_NAME);
        userEvent.click(screen.getByRole("button", { name: translate("publish") }));

        await waitFor(() => expect(createNftMock).toHaveBeenCalledWith(CREATE_NFT_REQUEST));
    });

    test("Updates an NFT draft", async () => {
        new UseSearchParamsMock({ id: "1" });

        jest.spyOn(NftService, "nftControllerGetNftDraft").mockResolvedValue(new NftDtoMock());
        const updateNftDraftMock = jest.spyOn(NftService, "nftControllerUpdateNftDraft").mockResolvedValueOnce(undefined);

        render(<NftCreationPage />);

        const saveButton = screen.getByRole("button", { name: translate("save") });
        await waitFor(expect(saveButton).not.toBeDisabled);
        const nameInput = screen.getByDisplayValue(nftDraftMockMetadata!.name!);
        userEvent.clear(nameInput);
        userEvent.type(nameInput, NFT_NAME);
        userEvent.click(saveButton);

        await waitFor(() => expect(updateNftDraftMock).toHaveBeenCalledWith(1, UPDATE_NFT_REQUEST, undefined));
    });

    test("Publishes an NFT draft", async () => {
        new UseSearchParamsMock({ id: "1" });

        jest.spyOn(NftService, "nftControllerGetNftDraft").mockResolvedValue(new NftDtoMock());
        const updateNftDraftMock = jest.spyOn(NftService, "nftControllerUpdateNftDraft").mockResolvedValueOnce(undefined);

        render(<NftCreationPage />);

        const publishButton = screen.getByRole("button", { name: translate("publish") });
        await waitFor(expect(publishButton).not.toBeDisabled);
        const nameInput = screen.getByDisplayValue(nftDraftMockMetadata!.name!);
        userEvent.clear(nameInput);
        userEvent.type(nameInput, NFT_NAME);
        userEvent.click(publishButton);

        await waitFor(() => expect(updateNftDraftMock).toHaveBeenCalledWith(1, UPDATE_NFT_REQUEST, true));
    });
});
