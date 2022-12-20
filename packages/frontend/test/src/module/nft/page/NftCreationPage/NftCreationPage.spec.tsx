import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import NftCreationPage from "module/nft/page/NftCreationPage/NftCreationPage";
import userEvent from "@testing-library/user-event";
import { CollectionService, NftService } from "module/api/service";
import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import {
    NftDtoMock,
    WalletMock,
    UseSearchParamsMock,
    ToastMock,
    ModalMock,
    UserDtoMock,
    PaginatedCollectionMock,
    PaginatedNftsMock,
} from "test-mocks";
import { waitFor } from "@testing-library/dom";
import Color from "color";
import parseFlags from "module/nft/util/parseFlags";
import { capitalize } from "@peersyst/react-utils";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";

describe("NftCreationPage", () => {
    const userMock = new UserDtoMock();
    const nftDraftMock = new NftDtoMock({ status: "draft", flags: 2, user: userMock });
    const nftDraftMockFlags = parseFlags(nftDraftMock.flags);
    const nftDraftMockMetadata = nftDraftMock.metadata;

    const NFT_NAME = "Name";
    const CREATE_NFT_REQUEST = createNftRequestFromForm({
        name: NFT_NAME,
        burnable: false,
        onlyXRP: false,
        trustLine: false,
        transferable: true,
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

    const useToastMock = new ToastMock();
    const useModalMock = new ModalMock();
    const useWallet = new WalletMock({ isLogged: true, active: true, address: userMock.address });
    const getMyCollectionsMock = jest
        .spyOn(CollectionService, "collectionControllerGetCollections")
        .mockResolvedValue(new PaginatedCollectionMock().pages[0]);
    const getCollectionNfts = jest.spyOn(NftService, "nftControllerGetMyNfts").mockResolvedValue(new PaginatedNftsMock().pages[0]);

    beforeEach(() => {
        useToastMock.clear();
        useModalMock.clear();
        useWallet.clear();
    });

    afterAll(() => {
        useToastMock.restore();
        useModalMock.restore();
        useWallet.restore();
        getMyCollectionsMock.mockRestore();
        getCollectionNfts.mockRestore();
    });

    describe("Creation with balance", () => {
        let useSearchParamsMock: UseSearchParamsMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock();
        });

        afterAll(() => {
            useSearchParamsMock.restore();
        });

        test("Renders creation correctly", () => {
            render(<NftCreationPage />);

            // header
            expect(screen.getByText(translate("createNft")));

            // image
            expect(screen.getByText(capitalize(translate("fileInputPlaceholder")))).toBeInTheDocument();
            // name
            expect(screen.getByText(capitalize(translate("name")))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("nftNamePlaceholder"))).toBeInTheDocument();
            // decription
            expect(screen.getByText(translate("description"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("nftDescriptionPlaceholder"))).toBeInTheDocument();
            // collection
            expect(screen.getByText(translate("collection"))).toBeInTheDocument();
            expect(screen.getByText(translate("collectionPlaceholder"))).toBeInTheDocument();

            // transfer fee
            expect(screen.getByText(translate("transferFee"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
            // external url
            expect(screen.getByText(translate("externalLink"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("externalLinkPlaceholder"))).toBeInTheDocument();
            // background color
            expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
            expect(screen.getByPlaceholderText(translate("nftBackgroundColorPlaceholder"))).toBeInTheDocument();
            // flags
            expect(screen.getByText(translate("burnable")));
            expect(screen.getByText(translate("onlyXRP")));
            expect(screen.getByText(translate("transferable")));
            // attributes
            expect(screen.getByText(translate("attributes"))).toBeInTheDocument();
        });

        test("Create an NFT draft", async () => {
            const createNftDraftMock = jest.spyOn(NftService, "nftControllerCreateNftDraft").mockResolvedValueOnce(new NftDtoMock());

            render(<NftCreationPage />);

            const saveButton = screen.getByRole("button", { name: translate("save") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());
            userEvent.type(screen.getByPlaceholderText(translate("nftNamePlaceholder")), NFT_NAME);
            userEvent.click(saveButton);

            await waitFor(() => expect(createNftDraftMock).toHaveBeenCalledWith(CREATE_NFT_REQUEST));
        });

        test("Create published NFT", async () => {
            render(<NftCreationPage />);
            const publishButton = screen.getByRole("button", { name: translate("publish") });
            await waitFor(() => expect(publishButton).not.toBeDisabled());
            userEvent.type(screen.getByPlaceholderText(translate("nftNamePlaceholder")), NFT_NAME);
            userEvent.click(publishButton);

            await waitFor(() =>
                expect(useModalMock.showModal).toHaveBeenCalledWith(
                    NftPublishModal,
                    expect.objectContaining({
                        request: expect.objectContaining({ metadata: expect.objectContaining({ name: NFT_NAME }) }),
                    }),
                ),
            );
        });
    });

    describe("Edition with balance", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let getNftMock: jest.SpyInstance;

        beforeEach(() => {
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
            // description
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.description!)).toBeInTheDocument();
            // attributes
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![0].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![0].value)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![1].traitType)).toBeInTheDocument();
            expect(screen.getByDisplayValue(nftDraftMock.metadata!.attributes![1].value)).toBeInTheDocument();
        });

        test("Removes id when NFT draft is not owned", async () => {
            const nftDraftMockNotOwner = new NftDtoMock({ status: "draft", flags: 2, user: new UserDtoMock({ address: "other_address" }) });
            jest.spyOn(NftService, "nftControllerGetNftDraft").mockResolvedValue(nftDraftMockNotOwner);
            render(<NftCreationPage />);

            await waitFor(() =>
                expect(useToastMock.showToast).toHaveBeenCalledWith(translate("nftNotOwned", { ns: "error" }), { type: "warning" }),
            );

            expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id");
            expect(useSearchParamsMock.setParams).toHaveBeenCalledWith(useSearchParamsMock.params);
        });

        test("Removes id when NFT not found", async () => {
            jest.spyOn(NftService, "nftControllerGetNftDraft").mockResolvedValueOnce(undefined as any);

            render(<NftCreationPage />);

            await waitFor(() => expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id"));
            expect(useSearchParamsMock.setParams).toHaveBeenCalledWith(useSearchParamsMock.params);
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
            render(<NftCreationPage />);

            const publishButton = screen.getByRole("button", { name: translate("publish") });
            await waitFor(() => expect(publishButton).not.toBeDisabled());
            const nameInput = screen.getByDisplayValue(nftDraftMockMetadata!.name!);
            userEvent.clear(nameInput);
            userEvent.type(nameInput, NFT_NAME);
            userEvent.click(publishButton);

            await waitFor(() =>
                expect(useModalMock.showModal).toHaveBeenCalledWith(
                    NftPublishModal,
                    expect.objectContaining({
                        request: expect.objectContaining({ metadata: expect.objectContaining({ name: NFT_NAME }) }),
                        draftId: 1,
                    }),
                ),
            );
        });
    });
});
