import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import CollectionCreationNfts from "module/collection/page/CollectionCreationPage/CollectionCreationNfts/CollectionCreationNfts";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import * as uploadFile from "module/api/service/helper/uploadFile";
import { UseCollectionCreationStateMock } from "test-mocks";
import { act } from "react-dom/test-utils";

describe("CollectionCreationNfts", () => {
    const URL = "url";
    let uploadFileMock: jest.MockInstance<any, any>;

    beforeAll(() => {
        uploadFileMock = jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(URL);
    });

    afterEach(() => {
        uploadFileMock.mockClear();
    });

    test("Renders correctly", () => {
        render(<CollectionCreationNfts />);

        // Image input
        expect(screen.getByText(translate("chooseFile"))).toBeInTheDocument();
    });

    test("Uploads nfts", async () => {
        const useCollectionCreationStateMock = new UseCollectionCreationStateMock();
        const testFiles = [...Array(3)].map((_, i) => new File(["hello"], "test.png " + i, { type: "image/png" }));

        render(<CollectionCreationNfts />);

        const imageInput = screen.getByTestId("upload");
        userEvent.upload(imageInput, testFiles);

        // 3 Skeletons
        expect(screen.getAllByText("loading_title")).toHaveLength(3);

        await act(async () =>
            waitFor(() =>
                expect(useCollectionCreationStateMock.setCollectionCreationState).toHaveBeenCalledWith({
                    nfts: [
                        expect.objectContaining({
                            metadata: expect.objectContaining({ name: `${useCollectionCreationStateMock.name} #1` }),
                        }),
                        expect.objectContaining({
                            metadata: expect.objectContaining({ name: `${useCollectionCreationStateMock.name} #2` }),
                        }),
                        expect.objectContaining({
                            metadata: expect.objectContaining({ name: `${useCollectionCreationStateMock.name} #3` }),
                        }),
                    ],
                }),
            ),
        );
    });
});
