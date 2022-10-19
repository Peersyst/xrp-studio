import { screen } from "@testing-library/react";
import * as uploadFile from "module/api/service/helper/uploadFile";
import { act, render, translate } from "test-utils";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import UploadInput from "module/common/component/input/UploadInput/UploadInput";

describe("UploadInput", () => {
    const URL = "url";
    let uploadFileMock: jest.MockInstance<any, any>;

    beforeAll(() => {
        uploadFileMock = jest.spyOn(uploadFile, "uploadFile").mockResolvedValue(URL);
    });

    afterEach(() => {
        uploadFileMock.mockClear();
    });

    test("Renders correctly", async () => {
        const testFile = new File(["hello"], "test.png", { type: "image/png" });

        render(
            <UploadInput defaultValue="default_url" uploadPath="test">
                {(url) => <p>{url}</p>}
            </UploadInput>,
        );

        expect(screen.getByRole("button", { name: translate("change") })).toBeInTheDocument();
        const url = screen.getByText("default_url");
        const input = url.parentElement?.parentElement?.getElementsByTagName("input")[0];
        userEvent.upload(input!, testFile);
        // Act has to be used as state is updated after uploading a file
        await act(async () => {
            await waitFor(() => expect(uploadFileMock).toHaveBeenCalledWith(testFile, "test"));
        });
        expect(screen.getByText(URL)).toBeInTheDocument();
    });
});
