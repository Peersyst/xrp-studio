import EditCollectionNftDraftPage from "module/collection/pages/EditNftCreationPage/EditCollectionNftDraftPage";
import { render, translate } from "test-utils";
import { WalletMock } from "test-mocks";
import { screen } from "@testing-library/react";
import { capitalize } from "@peersyst/react-utils";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("EditCollectionNftDraftPage", () => {
    describe("Edition", () => {
        let walletMock: WalletMock;

        beforeAll(() => {
            walletMock = new WalletMock({ active: true, address: "address" });
        });

        afterAll(() => {
            walletMock.restore();
        });

        test("Edition renders correctly", async () => {
            render(<EditCollectionNftDraftPage />);

            expect(screen.getByText(translate("editNft"))).toBeInTheDocument();
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

        test("Saves changes", async () => {
            const useCollectionCreationStateMock = jest.fn();
            jest.mock("module/collection/hook/useCollectionCreationState", () => {
                return jest.fn(() => [{}, () => useCollectionCreationStateMock]);
            });

            render(<EditCollectionNftDraftPage />);

            const saveButton = screen.getByRole("button", { name: translate("saveChanges") });
            await waitFor(() => expect(saveButton).not.toBeDisabled());
            userEvent.click(saveButton);

            await waitFor(() => expect(useCollectionCreationStateMock).toBeCalled());
        });
    });
});
