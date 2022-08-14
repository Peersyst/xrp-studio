import { MockFnType } from "../base.mock";
import { BaseReturnXummReactMockType, XummReactBaseReturnMock } from "./BaseXummReact.mock";

export interface SingInMockParams extends BaseReturnXummReactMockType {
    signIn?: MockFnType;
    signInLoading?: boolean;
    transactionRequestStatusLoading?: boolean;
    verifySignInLoading?: boolean;
}

export interface VerifySingInMockParams extends BaseReturnXummReactMockType {
    verifySignIn?: MockFnType;
}

export class SignInMock extends XummReactBaseReturnMock {
    signIn: MockFnType;
    signInLoading: boolean;
    transactionRequestStatusLoading: boolean;
    verifySignInLoading: boolean;
    constructor({
        signIn = jest.fn(),
        signInLoading = false,
        transactionRequestStatusLoading = false,
        verifySignInLoading = false,
        ...rest
    }: Partial<SingInMockParams> = {}) {
        super(rest);
        this.signIn = signIn;
        this.signInLoading = signInLoading;
        this.transactionRequestStatusLoading = transactionRequestStatusLoading;
        this.verifySignInLoading = verifySignInLoading;
    }
}

export class VerifySignInMock extends XummReactBaseReturnMock {
    verifySignIn: MockFnType;
    constructor({ verifySignIn = jest.fn(), ...rest }: Partial<VerifySingInMockParams> = {}) {
        super(rest);
        this.verifySignIn = verifySignIn;
    }
}
