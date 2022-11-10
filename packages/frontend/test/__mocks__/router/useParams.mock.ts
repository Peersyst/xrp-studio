import * as Router from "react-router-dom";
import BaseMock from "../base.mock";

export class UseParamsMock extends BaseMock {
    params: Record<string, any>;

    constructor(params: Record<string, string> = {}) {
        super();
        this.params = params;
        this.mock = jest.spyOn(Router, "useParams").mockReturnValue(params);
    }
}
