import { XummProviderProps } from "xumm-react";
import BaseMock, { MockFnType } from "../base.mock";

export class XummReactMock extends BaseMock {
    useSignIn: MockFnType;
    useVerifySignIn: MockFnType;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    XummProvider: (props: XummProviderProps) => JSX.Element;

    constructor() {
        super();
        this.useSignIn = jest.fn();
        this.useVerifySignIn = jest.fn();
        this.XummProvider = (props: XummProviderProps) => <>{props.children}</>;
    }
}
