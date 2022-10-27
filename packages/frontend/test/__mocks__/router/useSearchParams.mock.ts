import * as Router from "react-router-dom";
import { SearchParamsMock } from "./searchParams.mock";
import BaseMock from "../base.mock";

export class UseSearchParamsMock extends BaseMock {
    params: SearchParamsMock;
    setParams = jest.fn();

    constructor(params: Record<string, any> = {}) {
        super();
        this.params = new SearchParamsMock(params);
        this.mock = jest.spyOn(Router, "useSearchParams").mockReturnValue([this.params as unknown as URLSearchParams, this.setParams]);
    }
}
