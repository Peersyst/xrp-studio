import { screen } from "@testing-library/react";
import {
    UseSearchParamsMock,
    UseNavigateMock,
    CollectionDtoMock,
    PaginatedNftsMock,
    WalletMock,
    ToastMock,
    UserDtoMock,
    ModalMock,
} from "test-mocks";
import { render, translate } from "test-utils";
import { waitFor } from "@testing-library/dom";
import DropCreationPage from "module/drop/page/DropCreationPage/DropCreationPage";
import { CollectionService, NftService } from "module/api/service";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import userEvent from "@testing-library/user-event";
import DropLaunchModal from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal";
import * as CreateDropRequestFromForm from "module/drop/util/createDropRequestFromForm";

describe("DropCreationPage", () => {
    const paginatedNftsMock = new PaginatedNftsMock().pages[0];

    let useSearchParamsMock: UseSearchParamsMock;

    const getNftsMock = jest.spyOn(NftService, "nftControllerGetNfts").mockResolvedValue(paginatedNftsMock);
    const useNavigateMock = new UseNavigateMock();
    const useWalletMock = new WalletMock({ address: "address", isLogged: true });
    const useToastMock = new ToastMock();
    const useModalMock = new ModalMock();
    const createDropRequestFromFormMock = jest.spyOn(CreateDropRequestFromForm, "default").mockReturnValue(expect.any(Object));

    beforeEach(() => {
        getNftsMock.mockClear();
        useNavigateMock.clear();
        useWalletMock.clear();
        useToastMock.clear();
        useModalMock.clear();
        createDropRequestFromFormMock.mockClear();
    });

    describe("Creation Drop", () => {
        const collectionDtoMock = new CollectionDtoMock();

        let getCollectionMock: jest.SpyInstance;

        beforeEach(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValue(collectionDtoMock);
        });

        afterAll(() => {
            useSearchParamsMock.restore();
            getCollectionMock.mockRestore();
        });

        test("Renders correctly", async () => {
            render(<DropCreationPage />);

            // Header
            expect(screen.getByText(translate("customizeDropPage")));

            // Price
            expect(screen.getByPlaceholderText(translate("price"))).toBeInTheDocument();

            // Preview
            await waitFor(() => expect(screen.getByRole("heading", { name: collectionDtoMock.name })).toBeInTheDocument());
        });

        test("Launch drop", async () => {
            render(<DropCreationPage />);

            const launchButton = screen.getByRole("button", { name: translate("launchDrop") });
            // Await Collection call
            await waitFor(() => expect(launchButton).not.toBeDisabled());
            userEvent.click(launchButton);
            await waitFor(() =>
                expect(useModalMock.showModal).toHaveBeenCalledWith(DropLaunchModal, {
                    request: expect.any(Object),
                    collectionId: collectionDtoMock.id,
                }),
            );
        });
    });

    describe("Collection id is not provided", () => {
        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: undefined });
        });

        afterAll(() => {
            useSearchParamsMock.restore();
        });

        test("Redirects to /", () => {
            render(<DropCreationPage />);

            expect(useNavigateMock.navigate).toHaveBeenCalledWith(DashboardRoutes.MAIN);
        });
    });

    describe("Collection id is provided", () => {
        let getCollectionMock: jest.SpyInstance;

        beforeAll(() => {
            useSearchParamsMock = new UseSearchParamsMock({ id: "1" });
        });

        afterEach(() => {
            getCollectionMock.mockRestore();
        });

        afterAll(() => {
            useSearchParamsMock.restore();
        });

        test("Collection is not owned", async () => {
            const collectionDtoMock = new CollectionDtoMock({ user: new UserDtoMock({ address: "other-address" }) });

            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValueOnce(collectionDtoMock);

            render(<DropCreationPage />);

            await waitFor(() => expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id"));
            expect(useSearchParamsMock.setParams).toHaveBeenCalled();
            expect(useToastMock.showToast).toHaveBeenCalledWith(translate("collectionNotOwned", { ns: "error" }), { type: "warning" });
        });

        test("Collection does not exist", async () => {
            getCollectionMock = jest.spyOn(CollectionService, "collectionControllerGetCollection").mockResolvedValueOnce(undefined as any);

            render(<DropCreationPage />);

            await waitFor(() => expect(useSearchParamsMock.params.delete).toHaveBeenCalledWith("id"));
            expect(useSearchParamsMock.setParams).toHaveBeenCalled();
        });
    });
});
