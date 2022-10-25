import BaseMock, { MockFnType } from "../base.mock";
import * as Genesys from "@peersyst/react-components";

export interface GenesisDrawerMock {
    showDrawer: MockFnType;
    hideDrawer: MockFnType;
    isDrawerActive: MockFnType;
}

export class DrawerMock extends BaseMock implements GenesisDrawerMock {
    showDrawer: MockFnType;
    hideDrawer: MockFnType;
    isDrawerActive: MockFnType;
    constructor({ showDrawer = jest.fn(), hideDrawer = jest.fn(), isDrawerActive = jest.fn() }: Partial<GenesisDrawerMock> = {}) {
        super();
        this.hideDrawer = hideDrawer;
        this.showDrawer = showDrawer;
        this.isDrawerActive = isDrawerActive;
        jest.spyOn(Genesys, "useDrawer").mockReturnValue(this);
    }
}
