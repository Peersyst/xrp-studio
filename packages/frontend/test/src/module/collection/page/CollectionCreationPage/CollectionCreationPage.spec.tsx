import { screen } from "@testing-library/react";
import {
    CollectionDtoMock,
    ToastMock,
    UserDtoMock,
    UseSearchParamsMock,
    WalletMock,
    UseNavigateMock,
    UseCheckBalanceMock,
} from "test-mocks";
import { render, translate } from "test-utils";
import CollectionCreationPage from "module/collection/page/CollectionCreationPage/CollectionCreationPage";
import { CollectionService } from "module/api/service";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";

describe("CollectionCreationPage", () => {
    const COLLECTION_NAME = "collection_name";

    const useToastMock = new ToastMock();
    const useNavigateMock = new UseNavigateMock();

    beforeEach(() => {
        useToastMock.clear();
        useNavigateMock.clear();
    });

    describe("Creation with balance", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let useCheckBalanceMock: UseCheckBalanceMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock();
            useCheckBalanceMock = new UseCheckBalanceMock();
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            useCheckBalanceMock.restore();
        });

        test("Renders correctly", () => {
            render(<CollectionCreationPage />);

            // header
            expect(screen.getByRole("heading", { name: translate("createCollection") })).toBeInTheDocument();

            // Nfts input
            expect(screen.getByText(translate("uploadAFileToCreateAnNfts"))).toBeInTheDocument();

            // Collection form
            expect(screen.getByPlaceholderText(translate("collectionNamePlaceholder"))).toBeInTheDocument();

            // Nfts form
            expect(screen.getByPlaceholderText(translate("externalLinkPlaceholder"))).toBeInTheDocument();
        });

        test("Publishes collection", async () => {
            const publishCollectionMock = jest
                .spyOn(CollectionService, "collectionControllerCreateCollection")
                .mockResolvedValueOnce(new CollectionDtoMock());

            render(<CollectionCreationPage />);

            userEvent.type(screen.getByPlaceholderText(translate("collectionNamePlaceholder")), COLLECTION_NAME);
            const publishButton = screen.getByRole("button", { name: translate("publish") });
            userEvent.click(publishButton);
            await waitFor(() => expect(publishCollectionMock).toHaveBeenCalledWith({ name: COLLECTION_NAME }, true));
            await waitFor(() => expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionCreated"), { type: "success" }));
            expect(useNavigateMock.navigate).toHaveBeenCalledWith(CollectionRoutes.MY_COLLECTIONS, { replace: true });
        });

        test("Saves collection", async () => {
            const publishCollectionMock = jest
                .spyOn(CollectionService, "collectionControllerCreateCollection")
                .mockResolvedValueOnce(new CollectionDtoMock());

            render(<CollectionCreationPage />);

            userEvent.type(screen.getByPlaceholderText(translate("collectionNamePlaceholder")), COLLECTION_NAME);
            const publishButton = screen.getByRole("button", { name: translate("save") });
            userEvent.click(publishButton);
            await waitFor(() => expect(publishCollectionMock).toHaveBeenCalledWith({ name: COLLECTION_NAME }, false));
            await waitFor(() => expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionCreated"), { type: "success" }));
            expect(useNavigateMock.navigate).toHaveBeenCalledWith(CollectionRoutes.MY_COLLECTIONS, { replace: true });
        });
    });

    describe("Creation without balance", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let useCheckBalanceMock: UseCheckBalanceMock;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock();
            useCheckBalanceMock = new UseCheckBalanceMock(false);
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            useCheckBalanceMock.restore();
        });

        test("Publishes without balance", async () => {
            const publishCollectionMock = jest
                .spyOn(CollectionService, "collectionControllerCreateCollection")
                .mockResolvedValueOnce(new CollectionDtoMock());

            render(<CollectionCreationPage />);

            userEvent.type(screen.getByPlaceholderText(translate("collectionNamePlaceholder")), COLLECTION_NAME);
            const publishButton = screen.getByRole("button", { name: translate("publish") });
            userEvent.click(publishButton);
            await waitFor(() => expect(publishCollectionMock).toHaveBeenCalledWith({ name: COLLECTION_NAME }, true));
            await waitFor(() => expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionCreated"), { type: "success" }));
            expect(useNavigateMock.navigate).toHaveBeenCalledWith(CollectionRoutes.MY_COLLECTIONS, { replace: true });
        });
    });

    describe("Edition", () => {
        let useSearchParamsMock: UseSearchParamsMock;
        let getCollectionMock: jest.SpyInstance;
        let useWalletMock: WalletMock;
        const addressMock = "address";
        const collectionDtoMock = new CollectionDtoMock({ name: "name", user: new UserDtoMock({ address: addressMock }) });
        let useCheckBalanceMock: UseCheckBalanceMock;

        beforeEach(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
            useWalletMock = new WalletMock({ isLogged: true, active: true, address: addressMock });
            useCheckBalanceMock = new UseCheckBalanceMock();
        });

        afterEach(() => {
            getCollectionMock.mockRestore();
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            useWalletMock.restore();
            useCheckBalanceMock.restore();
        });

        test("Renders correctly", async () => {
            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValueOnce(collectionDtoMock);

            render(<CollectionCreationPage />);

            // header
            expect(screen.getByRole("heading", { name: translate("editCollection") })).toBeInTheDocument();

            // Collection form
            // Await get collection call
            await waitFor(() => expect(screen.getByDisplayValue(collectionDtoMock.name!)).toBeInTheDocument());

            // Nfts input not rendered
            expect(screen.queryByText(translate("uploadAFileToCreateAnNfts"))).toBeNull();

            // Nfts form no rednered
            expect(screen.queryByPlaceholderText(translate("externalLinkPlaceholder"))).toBeNull();
        });

        test("Removes id when collection is not owned", async () => {
            getCollectionMock = jest
                .spyOn(CollectionService, "collectionControllerGetCollection")
                .mockResolvedValueOnce({ ...collectionDtoMock, user: new UserDtoMock({ address: "other_address" }) });

            render(<CollectionCreationPage />);

            await waitFor(() =>
                expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionNotOwned", { ns: "error" }), { type: "warning" }),
            );
            expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id");
            expect(useSearchParamsMock.setParams).toHaveBeenCalledWith(useSearchParamsMock.params);
        });

        test("Removes id when collection not found", async () => {
            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValueOnce(undefined as any);

            render(<CollectionCreationPage />);

            await waitFor(() => expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id"));
            expect(useSearchParamsMock.setParams).toHaveBeenCalledWith(useSearchParamsMock.params);
        });

        test("Updates collection", async () => {
            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValueOnce(collectionDtoMock);
            const updateCollectionMock = jest.spyOn(CollectionService, "collectionControllerUpdateCollection").mockResolvedValueOnce();

            render(<CollectionCreationPage />);

            // Await get collection call
            const saveButton = screen.getByRole("button", { name: translate("save") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());
            const nameInput = screen.getByDisplayValue(collectionDtoMock.name!);
            userEvent.clear(nameInput);
            userEvent.type(nameInput, COLLECTION_NAME);
            userEvent.click(saveButton);

            await waitFor(() =>
                expect(updateCollectionMock).toHaveBeenCalledWith(1, {
                    name: COLLECTION_NAME,
                    description: collectionDtoMock.description,
                    header: collectionDtoMock.header,
                    image: collectionDtoMock.image,
                }),
            );
            await waitFor(() => expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionUpdated"), { type: "success" }));
            expect(useNavigateMock.navigate).toHaveBeenCalledWith(CollectionRoutes.MY_COLLECTIONS, { replace: true });
        });
    });
});
