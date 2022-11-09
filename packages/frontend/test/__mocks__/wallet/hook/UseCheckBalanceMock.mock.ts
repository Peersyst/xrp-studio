import BaseMock from "../../base.mock";
import * as useCheckBalance from "module/wallet/hook/useCheckBalance";

export class UseCheckBalanceMock extends BaseMock {
    checkBalance: jest.Mock<Promise<boolean>>;

    constructor(value = true) {
        super();
        this.checkBalance = jest.fn(async () => {
            await new Promise((resolve) => resolve(undefined));
            return value;
        });
        this.mock = jest.spyOn(useCheckBalance, "default").mockReturnValue(this.checkBalance);
    }
}
