import BaseMock, { MockFnType } from "../base.mock";
import * as Genesys from "@peersyst/react-components";

export interface GenesysUseDialogMock {
    showDialog: MockFnType;
    hideDialog: MockFnType;
    isDialogOpen: MockFnType;
}

export class UseDialogMock extends BaseMock implements GenesysUseDialogMock {
    showDialog: MockFnType;
    hideDialog: MockFnType;
    isDialogOpen: MockFnType;
    constructor({ showDialog = jest.fn(), hideDialog = jest.fn(), isDialogOpen = jest.fn() }: Partial<GenesysUseDialogMock> = {}) {
        super();
        this.showDialog = showDialog;
        this.hideDialog = hideDialog;
        this.isDialogOpen = isDialogOpen;
        jest.spyOn(Genesys, "useDialog").mockReturnValue(this);
    }
}
