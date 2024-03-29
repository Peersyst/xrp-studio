import useConnectToXumm from "module/wallet/hook/useConnectToXumm/useConnectToXumm";
import { act, renderHook } from "test-utils";
import { SignInMock } from "../../../../__mocks__/xumm-react/XummReactFunctions.mock";
import * as XummReact from "xumm-react";

const renderUseConnectToXumm = () =>
    renderHook(() => {
        return useConnectToXumm({ callback: () => jest.fn() });
    });

describe("useConnectToXumm test", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Trigger singin correctly", async () => {
        const mockedSingIn = jest.fn();
        const mockedXummReact = new SignInMock({ signIn: mockedSingIn });
        jest.spyOn(XummReact, "useSignIn").mockReturnValue(mockedXummReact);
        const { signIn } = renderUseConnectToXumm().result.current;
        await act(async () => {
            await signIn();
        });
        expect(mockedSingIn).toHaveBeenCalled();
    });
});
