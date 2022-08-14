import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useLoad } from "module/common/hook/useLoad";
import { renderHook, waitFor } from "test-utils";
import * as XummReact from "xumm-react";
import { VerifySignInMock } from "../../../../__mocks__/xumm-react/XummReactFunctions.mock";

const renderUseLoad = () =>
    renderHook(() => {
        return useLoad();
    });

describe("useLoad tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Loads without token", async () => {
        //XummMocks
        const mockedVerifySignIn = jest.fn().mockResolvedValueOnce("");
        const mockedXummReact = new VerifySignInMock({ verifySignIn: mockedVerifySignIn });
        jest.spyOn(XummReact, "useVerifySignIn").mockReturnValue(mockedXummReact);
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => null);
        const result = renderUseLoad().result;
        expect(result.current).toBe(false);
        expect(getAuthToken).toHaveBeenCalled();
        expect(mockedVerifySignIn).not.toHaveBeenCalled();
    });

    test("Loads with token", async () => {
        //XummMocks
        const mockedVerifySignIn = jest.fn().mockResolvedValueOnce("");
        const mockedXummReact = new VerifySignInMock({ verifySignIn: mockedVerifySignIn });
        jest.spyOn(XummReact, "useVerifySignIn").mockReturnValue(mockedXummReact);
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => "test_token");
        const result = renderUseLoad().result;
        expect(result.current).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        await waitFor(() => expect(result.current).toBe(false));
        await waitFor(() => expect(mockedVerifySignIn).toHaveBeenCalled());
    });
});
