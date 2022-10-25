import * as Router from "react-router-dom";
import { SearchParamsMock } from "./searchParams.mock";

export class UseSearchParamsMock {
    params: SearchParamsMock;
    setParams = jest.fn();

    constructor(params: Record<string, any> = {}) {
        this.params = new SearchParamsMock(params);
        jest.spyOn(Router, "useSearchParams").mockReturnValue([this.params as unknown as URLSearchParams, this.setParams]);
    }
}
