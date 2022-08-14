import BaseMock from "./base.mock";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";

class IpfsServiceMock extends BaseMock {
    CID_MOCK = "QmCid";

    getFile = jest.spyOn(IpfsService.prototype, "getFile").mockReturnValue(new Promise((resolve) => resolve(Buffer.from("Hola"))));
    uploadFile = jest.spyOn(IpfsService.prototype, "uploadFile").mockReturnValue(new Promise((resolve) => resolve(this.CID_MOCK)));
}

export default IpfsServiceMock;
