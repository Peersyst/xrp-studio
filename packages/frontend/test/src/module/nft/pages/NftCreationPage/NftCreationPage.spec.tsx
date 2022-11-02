import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import NftCreationPage from "module/nft/pages/NftCreationPage/NftCreationPage";
import userEvent from "@testing-library/user-event";
import { NftService } from "module/api/service";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import { NftDtoMock, WalletMock } from "test-mocks";
import { waitFor } from "@testing-library/dom";
import Color from "color";
import { UseSearchParamsMock } from "test-mocks";
import parseFlags from "module/nft/util/parseFlags";
import { capitalize } from "@peersyst/react-utils";

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

    describe("Creation", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let walletMock: WalletMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock();
            walletMock = new WalletMock({ active: true, address: "address" });
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            walletMock.restore();
        });

        test("Renders creation correctly", () => {
            render(<NftCreationPage />);

            // header
            expect(screen.getByText(translate("createNft")));

            // image
            expect(screen.getByText(capitalize(translate("fileInputPlaceholder")))).toBeInTheDocument();
            // name
            expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("namePlaceholder"))).toBeInTheDocument();
            // decription
            expect(screen.getByText(translate("description"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("descriptionPlaceholder"))).toBeInTheDocument();
            // collection
            expect(screen.getByText(translate("collection"))).toBeInTheDocument();
            expect(screen.getByText(translate("collectionPlaceholder"))).toBeInTheDocument();
            // issuer
            expect(screen.getByText(translate("issuer"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate(walletMock.address))).toBeInTheDocument();
            // transfer fee
            expect(screen.getByText(translate("transferFee"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
            // external url
            expect(screen.getByText(translate("externalLink"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("externalLinkPlaceholder"))).toBeInTheDocument();
            // background color
            expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("backgroundColorPlaceholder"))).toBeInTheDocument();
            // flags
            expect(screen.getByText(translate("burnable")));
            expect(screen.getByText(translate("onlyXRP")));
            expect(screen.getByText(translate("trustLine")));
            expect(screen.getByText(translate("transferable")));
            // attributes
            expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
        });

        test("Create an NFT draft", async () => {
            const createNftDraftMock = jest.spyOn(NftService, "nftControllerCreateNftDraft").mockResolvedValueOnce(new NftDtoMock());

            render(<NftCreationPage />);

            const saveButton = screen.getByRole("button", { name: translate("save") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());
            userEvent.type(screen.getByPlaceholderText(translate("namePlaceholder")), NFT_NAME);
            userEvent.click(saveButton);

            await waitFor(() => expect(createNftDraftMock).toHaveBeenCalledWith(CREATE_NFT_REQUEST));
        });

        test("Create published NFT", async () => {
            const createNftMock = jest.spyOn(NftService, "nftControllerCreateNft").mockResolvedValueOnce(new NftDtoMock());

            render(<NftCreationPage />);

            const publishButton = screen.getByRole("button", { name: translate("publish") });
            await waitFor(() => expect(publishButton).not.toBeDisabled());
            userEvent.type(screen.getByPlaceholderText(translate("namePlaceholder")), NFT_NAME);
            userEvent.click(publishButton);

            await waitFor(() => expect(createNftMock).toHaveBeenCalledWith(CREATE_NFT_REQUEST));
        });
    });

    describe("Edition", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let getNftMock: jest.SpyInstance;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
            getNftMock = jest.spyOn(NftService, "nftControllerGetNftDraft").mockResolvedValue(nftDraftMock);
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            getNftMock.mockRestore();
        });

        test("Renders edition correctly", async () => {
            render(<NftCreationPage />);

            const saveButton = screen.getByRole("button", { name: translate("save") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());

            // header
            expect(screen.getByText(translate("editNft")));

            // image
            const imgs = screen.getAllByRole("img");
            expect(imgs.some((img) => img.getAttribute("src") === nftDraftMock.metadata!.image!)).toBeTruthy();
            // name
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.name!)).toBeInTheDocument();
            // decription
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.description!)).toBeInTheDocument();
            // attributes
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![0].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![0].value)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![1].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![1].value)).toBeInTheDocument();
        });

        test("Updates an NFT draft", async () => {
            const updateNftDraftMock = jest.spyOn(NftService, "nftControllerUpdateNftDraft").mockResolvedValueOnce(undefined);

            render(<NftCreationPage />);

            const saveButton = screen.getByRole("button", { name: translate("save") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());
            const nameInput = screen.getByDisplayValue(nftDraftMockMetadata!.name!);
            userEvent.clear(nameInput);
            userEvent.type(nameInput, NFT_NAME);
            userEvent.click(saveButton);

            await waitFor(() => expect(updateNftDraftMock).toHaveBeenCalledWith(1, UPDATE_NFT_REQUEST, false));
        });

        test("Publishes an NFT draft", async () => {
            const updateNftDraftMock = jest.spyOn(NftService, "nftControllerUpdateNftDraft").mockResolvedValueOnce(undefined);

            render(<NftCreationPage />);

            const publishButton = screen.getByRole("button", { name: translate("publish") });
            await waitFor(() => expect(publishButton).not.toBeDisabled());
            const nameInput = screen.getByDisplayValue(nftDraftMockMetadata!.name!);
            userEvent.clear(nameInput);
            userEvent.type(nameInput, NFT_NAME);
            userEvent.click(publishButton);

            await waitFor(() => expect(updateNftDraftMock).toHaveBeenCalledWith(1, UPDATE_NFT_REQUEST, true));
        });
    });
});