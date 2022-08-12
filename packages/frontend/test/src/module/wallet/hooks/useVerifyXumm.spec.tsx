import { act, renderHook } from "test-utils";
import * as XummReact from "xumm-react";
import { useVerifyXumm } from "module/wallet/component/hooks/useVerifyXumm/useVerifyXumm";
import { VerifySignInMock } from "../../../../__mocks__/xumm-react/XummReactFunctions.mock";

const renderUseVerifyXumm = () =>
    renderHook(() => {
        return useVerifyXumm();
    });

describe("useConnectToXumm test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Trigger verify correctly", async () => {
        //XummMocks
        const mockedVerifySignIn = jest.fn().mockResolvedValueOnce("");
        const mockedXummReact = new VerifySignInMock({ verifySignIn: mockedVerifySignIn });
        jest.spyOn(XummReact, "useVerifySignIn").mockReturnValue(mockedXummReact);
        act(() => {
            const verifySignIn = renderUseVerifyXumm().result.current;
            verifySignIn();
        });
        expect(mockedVerifySignIn).toHaveBeenCalled();
    });
});
