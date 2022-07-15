import BaseMock from "./base.mock";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";

class IpfsServiceMock extends BaseMock {
    getFile = jest.spyOn(IpfsService.prototype, "getFile").mockReturnValue(new Promise((resolve) => resolve(Buffer.from("Hola"))));
}

export default IpfsServiceMock;
