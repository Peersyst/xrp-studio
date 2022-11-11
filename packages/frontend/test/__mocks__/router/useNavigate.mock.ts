import * as Router from "react-router-dom";
import BaseMock from "../base.mock";

export class UseNavigateMock extends BaseMock {
    navigate: jest.Mock;

    constructor(navigate: jest.Mock = jest.fn()) {
        super();
        this.navigate = navigate;
        this.mock = jest.spyOn(Router, "useNavigate").mockReturnValue(this.navigate);
    }
}
