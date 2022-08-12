import { AuthTokenStorage } from "module/auth/AuthTokenStorage";
import { useLoad } from "module/common/hook/useLoad";
import { act, renderHook, waitFor } from "test-utils";
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

    test("Loads without token", () => {
        //XummMocks
        const mockedVerifySignIn = jest.fn().mockResolvedValueOnce("");
        const mockedXummReact = new VerifySignInMock({ verifySignIn: mockedVerifySignIn });
        jest.spyOn(XummReact, "useVerifySignIn").mockReturnValue(mockedXummReact);
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => null);
        let loading = false;
        act(() => {
            loading = renderUseLoad().result.current;
        });
        expect(loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        expect(mockedVerifySignIn).not.toHaveBeenCalled();
        //Wait untill sets state
        waitFor(() => expect(loading).toBe(false));
    });

    test("Loads with token", async () => {
        //XummMocks
        const mockedVerifySignIn = jest.fn().mockResolvedValueOnce("");
        const mockedXummReact = new VerifySignInMock({ verifySignIn: mockedVerifySignIn });
        jest.spyOn(XummReact, "useVerifySignIn").mockReturnValue(mockedXummReact);
        const getAuthToken = jest.spyOn(AuthTokenStorage, "get").mockImplementation(() => "test_token");
        let loading = false;
        await act(async () => {
            loading = await renderUseLoad().result.current;
        });
        expect(loading).toBe(true);
        expect(getAuthToken).toHaveBeenCalled();
        waitFor(() => expect(mockedVerifySignIn).toHaveBeenCalled());
        waitFor(() => expect(loading).toBe(false));
    });
});
